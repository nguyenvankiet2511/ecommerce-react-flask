from ApiCoryn import app, flow, db
from flask_cors import cross_origin
from ApiCoryn.service import users_service, categories_service, products_service, cart_service, shipper_sevice, \
    address_service, order_service, orderDetail_service
from ApiCoryn.model import UsersRole, Accounts, Users, Customers, Carts, Orders, OrderDetails
from flask import render_template, session, flash, jsonify, redirect, request, session
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


@app.route("/", methods=['GET'])
def load_login():
    return render_template('login.html')


@app.route("/login-test", methods=['post'])
def user_login():
    pass
    # username = request.form.get('username')
    # password = request.form.get("password")
    #
    # user = users_service.auth_user(username=username, password=password)
    # if user:
    #     login_user(user=user)
    #     return render_template('login.html')
    # else:
    #     return render_template('login.html')


@app.route("/login", methods=['POST', 'GET'])
def auth_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'status': 'error', 'message': 'Username and password are required.'}), 400

    user = Accounts.query.filter_by(username=username).first()
    if not user:
        return jsonify({'status': 'error', 'message': 'Specified user does not exist.'}), 400

    # Verify user credentials
    user = users_service.auth_user(username=username, password=password)
    if user:
        # Sử dụng UsersRole để lấy tên role
        role_name = UsersRole(user.users_role_id).name

        # Tạo access token với role
        access_token = create_access_token(
            identity={"user_id": user.user_id, "name": user.name, "role": role_name})

        return jsonify({
            "access_token": access_token,
            "user_id": user.user_id,
            "role": role_name,
            "message": "successful"
        })
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


@app.route("/oauth-login", methods=['GET'])
def login_oauth():
    authorization_url, state = flow.authorization_url()
    return jsonify(authorization_url=authorization_url)


@app.route("/callback", methods=['GET'])
def oauth_callback():
    try:
        user_oauth = users_service.get_user_oauth()
        print(user_oauth)
        email = user_oauth['email']
        account = Accounts.query.filter_by(email=email).first()
        if account is None:
            import hashlib
            password = str(hashlib.md5('123456'.encode('utf-8')).hexdigest())
            fullname = user_oauth['name']
            image = user_oauth['picture']
            users = Users(name=fullname, email=email, photoPath=image)
            db.session.add(users)
            db.session.flush()
            customer = Customers(id=users.id)
            db.session.add(customer)
            accountNew = Accounts(name=fullname, email=email, password=password, user_id=users.id)
            db.session.add(accountNew)
            db.session.commit()
            access_token = create_access_token(
                identity={"user_id": accountNew.user_id, "name": accountNew.name,
                          "role": accountNew.users_role_id.value})
            return jsonify({"access_token": access_token, "message": "successful"})
        else:
            access_token = create_access_token(
                identity={"user_id": account.user_id, "name": account.name, "role": account.users_role_id.name})
            return jsonify({"access_token": access_token, "message": "successful"})
    except Exception as err:
        print(err)
        return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/protected', methods=['GET'])
@jwt_required()  # Đảm bảo rằng chỉ người dùng có token hợp lệ mới truy cập được
def protected():
    current_user = get_jwt_identity()  # Lấy thông tin người dùng từ token
    return jsonify(logged_in_as=current_user), 200


@app.route('/get-user/<id>', methods=['GET'])
def get_inf_user(id):
    return users_service.get_inf_user(id)


@app.route('/update-user/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    data = request.get_json()

    name = data.get('name')
    phone = data.get('phone')
    birthday = data.get('birthday')
    photoPath = data.get('photoPath')
    address = data.get('address')
    updated = users_service.update_inf_user(user_id, name, phone, birthday, photoPath, address)
    if updated:
        return jsonify({"message": "User updated successfully"}), 200
    else:
        return jsonify({"message": "User not found or update failed"}), 404


# API Categories------------------------------------------>
@app.route("/categories", methods=['GET'])
def view_category():
    return categories_service.get_all_categories()


@app.route("/categories/<categoryId>", methods=['GET'])
def view_product_by_categoryId(categoryId):
    return products_service.get_products_by_categoryId(categoryId)


@app.route("/categories/delete/<category_id>", methods=['DELETE'])
def delete_category(category_id):
    return categories_service.delete_category(category_id)


@app.route("/categories/update/<category_id>", methods=['PUT'])
def update_category(category_id):
    return categories_service.update_category(category_id)


@app.route("/categories/create/<category_id>", methods=['POST'])
def add_category():
    return categories_service.create_categories()


# API Products-------------------------------------------->
@app.route("/products", methods=['GET'])
def view_product():
    return products_service.get_all_products()


@app.route("/products/<product_id>", methods=['GET'])
def view_product_by_id(product_id):
    return products_service.get_product(product_id)


@app.route("/products/search", methods=['GET'])
def view_product_by_name_and_price():
    return products_service.get_product_by_name_and_price()


@app.route("/products/search/<name>", methods=['GET'])
def view_product_by_name(name):
    return products_service.get_product_by_name(name)


# API Cart------------------------------------------------------------------
@app.route('/cart_count/<user_id>', methods=['GET'])
def cart_count(user_id):
    count = cart_service.get_count_cart(user_id)
    return jsonify({'cart_count': count})


@app.route('/cart/add', methods=['POST'])
def add_cart():
    try:
        data = request.get_json()
        product_id = data.get('product_id')
        customer_id = data.get('customer_id')
        quantity = data.get('quantity')
        if not product_id or not customer_id or quantity is None:
            return jsonify({"error": "Không đủ dữ liệu"}), 400
        if quantity <= 0:
            return jsonify({"error": "Số lượng nhỏ hơn 0"}), 400
        cart_service.add_to_cart(customer_id, product_id, quantity)
        return jsonify({"message": "Product added to cart successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/cart/update', methods=['POST'])
def update_cart():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        cart_id = data.get('cartId')
        new_quantity = data.get('quantity')
        if not cart_id or not isinstance(new_quantity, int) or new_quantity < 1:
            return jsonify({'error': 'Dữ liệu không đủ'}), 400
        cart_service.update_quantity_cart(cart_id, new_quantity)
        return jsonify({'message': 'Cập nhật giỏ hàng thành công'}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Lỗi cập nhật giỏ hàng'}), 500


@app.route("/cart/remove/<id>", methods=['DELETE'])
def remove_cart(id):
    try:
        cart_item = Carts.query.get(id)
        if cart_item:
            db.session.delete(cart_item)
            db.session.commit()
            return jsonify({"message": "Xóa sản phẩm thành công."}), 200
        else:
            return jsonify({"message": "Không thành công."}), 404
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"message": "An error occurred while removing the cart item."}), 500


@app.route('/cart/<user_id>', methods=['GET'])
def view_cart(user_id):
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    try:
        products = cart_service.get_products_to_cart(user_id)
        return jsonify(products)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Order-------------------------------------------------------------
@app.route("/order/create-order-customer", methods=['POST'])
def create_order_customer():
    try:
        data = request.get_json()
        customer_id = data.get('customer_id')
        address_id = data.get('address_id')
        shipper_id = data.get('shipper_id')
        total = data.get('total')
        payment_methods = data.get('paymentMethods')
        l_product_id = data.get('l_productId')
        l_quantity = data.get('l_quantity')
        l_cart_id = data.get('l_cartId')

        # Kiểm tra nếu thiếu dữ liệu cần thiết
        if not all([customer_id, address_id, shipper_id, total, l_product_id, l_quantity, l_cart_id]):
            return jsonify({"error": "Dữ liệu không đầy đủ"}), 400
        order_service.create_order_customer(customer_id=customer_id, address_id=address_id, shipper_id=shipper_id,
                                            total=total, paymentMethods=payment_methods, l_productId=l_product_id,
                                            l_cartId=l_cart_id, l_quantity=l_quantity)
        return jsonify({"message": "Đơn hàng đã được tạo thành công!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/order/payment', methods=['POST', 'GET'])
def order_payment():
    try:
        data = request.get_json()
        name = data.get('name')
        phone = data.get('phone')
        diaChi = data.get('address')
        ngaySinh = data.get('birthDate')
        l_productId = data.get('lProductId')
        l_quantity = data.get('lQuantity')
        employeeId = data.get('employeeId')
        if not name or not phone or not l_productId or not l_quantity:
            return jsonify({'status': 'error', 'message': 'Missing required fields.'}), 400
        order_service.create_order(
            name=name,
            ngaySinh=ngaySinh,
            diaChi=diaChi,
            phone=phone,
            l_soLuong=l_quantity,
            l_productId=l_productId,
            employee_id=employeeId
        )
        return jsonify({'status': 'success', 'message': 'Order created successfully.'}), 201
    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({'status': 'error', 'message': str(e)}), 500
@app.route("/comfirm-order/<id>", methods=['PATCH'])
def comfirm_order(id):
    result= order_service.chang_active_order(id)
    if result:
        return jsonify("Sucessful")
    else:
        return jsonify("Fail")
@app.route("/delete-order/<id>", methods=["DELETE"])
def delete_comfirm(id):
    result = order_service.delete_order(id)
    if result:
        return jsonify({"message": "Successful"}), 200
    else:
        return jsonify({"message": "Failed to delete order"}), 404


@app.route('/get-order-default', methods=['GET'])
def get_order_default():
    return order_service.get_all_orders_default()


@app.route('/get-order-comfirm', methods=['GET'])
def get_order_comfirm():
    return order_service.get_all_orders_confirm()

@app.route('/get-order-invoice/<id>', methods=["GET"])
def get_order_invoice(id):
    return order_service.get_order_confirm(id)
#orderDetail--------------------------------------
@app.route("/get-order-detail/<order_id>", methods=['GET'])
def get_order_detail(order_id):
    return orderDetail_service.get_order_detail(order_id)
# Shipper------------------------------------------
@app.route('/shipper', methods=['GET'])
def view_shipper():
    return shipper_sevice.get_all_shipper()


@app.route('/shipper/<id>', methods=['GET'])
def view_shipper_id(id):
    return shipper_sevice.get_fee(id)


# Address-----------------------------------------------------------------
@app.route('/address/<customer_id>', methods=['GET'])
def view_address(customer_id):
    return address_service.get_all_address_by_id(customer_id)


@app.route('/address/add', methods=['POST'])
def add_address():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')
    address = data.get('address')
    address_detail = data.get('addressDetail')
    customer_id = data.get('customerId')
    if not all([name, phone, address, customer_id]):
        return jsonify({"error": "Thông tin không đầy đủ"}), 400
    try:
        address_service.create_address_new(
            name=name,
            phone=phone,
            address=address,
            address_detail=address_detail,
            customer_id=customer_id
        )
        return jsonify({"message": "Tạo thành công"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Shipper-----------------------------------------------------------



if __name__ == "__main__":
    app.run(host='localhost', port=5001, debug=True)
