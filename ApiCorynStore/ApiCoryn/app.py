from ApiCoryn import app, flow, db
from flask_cors import cross_origin
from ApiCoryn.service import users_service, categories_service, products_service, cart_service
from ApiCoryn.model import UsersRole, Accounts, Users, Customers
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
        # Access attributes directly
        access_token = create_access_token(
            identity={"user_id": user.user_id, "name": user.name, "role": user.users_role_id.value})
        return jsonify({"access_token": access_token, "user_id":user.user_id ,"message": "successful"})
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
                identity={"user_id": accountNew.user_id, "name": accountNew.name, "role": accountNew.users_role_id.value})
            return jsonify({"access_token": access_token, "message": "successful"})
        else:
            access_token = create_access_token(
                identity={"user_id": account.user_id, "name": account.name, "role": account.users_role_id.value})
            return jsonify({"access_token": access_token, "message": "successful"})
    except Exception as err:
        print(err)
        return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/protected', methods=['GET'])
@jwt_required()  # Đảm bảo rằng chỉ người dùng có token hợp lệ mới truy cập được
def protected():
    current_user = get_jwt_identity()  # Lấy thông tin người dùng từ token
    return jsonify(logged_in_as=current_user), 200


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

#API Cart------------------------------------------------------------------
@app.route('/cart/<user_id>', methods=['GET'])
def view_cart(user_id):
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    try:
        products = cart_service.get_products_to_cart(user_id)
        return jsonify(products)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host='localhost', port=5001, debug=True)
