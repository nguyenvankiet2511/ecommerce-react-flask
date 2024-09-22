from datetime import datetime

from flask import jsonify
from sqlalchemy.orm import aliased

from ApiCoryn import db
from ApiCoryn.model import Orders, Products, OrderDetails,Customers,Users, BillingAddress,Shippers
from ApiCoryn.service import cart_service,products_service

def create_order(name, phone, ngaySinh, diaChi, employee_id, l_productId, l_soLuong):
    # Tạo người dùng và khách hàng
    user = Users(name=name, phone=phone, address=diaChi, birthDate=ngaySinh)
    db.session.add(user)
    db.session.flush()

    customer = Customers(id=user.id)
    db.session.add(customer)
    db.session.flush()

    # Tính tổng tiền đơn hàng
    totals = 0
    for i in range(len(l_productId)):
        price = products_service.get_price_product(l_productId[i])
        if price is None or price == '':
            raise ValueError(f"Không tìm thấy giá cho sản phẩm với ID {l_productId[i]}")
        try:
            price = float(price)  # Đảm bảo giá là số thực
        except ValueError:
            raise ValueError(f"Giá sản phẩm với ID {l_productId[i]} không hợp lệ")

        quantity = l_soLuong[i]
        if quantity is None or quantity == '':
            raise ValueError(f"Số lượng cho sản phẩm với ID {l_productId[i]} không hợp lệ")
        try:
            quantity = int(quantity)  # Đảm bảo số lượng là số nguyên
        except ValueError:
            raise ValueError(f"Số lượng cho sản phẩm với ID {l_productId[i]} không hợp lệ")

        totals += price * quantity

    # Tạo đơn hàng
    order = Orders(customer_id=customer.id, employee_id=employee_id,orderComfirm=datetime.now().date(), orderDate=datetime.now().date(), active=True,
                   totalAmount=totals, )
    db.session.add(order)
    db.session.flush()
    for i in range(len(l_productId)):
        product = products_service.get_product_by_id(l_productId[i])
        if product is None:
            raise ValueError(f"Không tìm thấy sản phẩm với ID {l_productId[i]}")

        quantity = l_soLuong[i]
        try:
            quantity = int(quantity)  # Đảm bảo số lượng là số nguyên
        except ValueError:
            raise ValueError(f"Số lượng cho sản phẩm với ID {l_productId[i]} không hợp lệ")

        order_detail = OrderDetails(
            product_id=l_productId[i],
            quantity=quantity,
            price=product.price,
            discount=product.discount,
            order_id=order.id
        )
        print(order_detail.id)
        db.session.add(order_detail)

    # Lưu tất cả thay đổi vào cơ sở dữ liệu
    db.session.commit()

def create_order_customer(customer_id, address_id, shipper_id, total, paymentMethods, l_productId, l_quantity, l_cartId):
    new_order = Orders(customer_id=customer_id, shipper_id=shipper_id, billingAddress_id=address_id,
                       paymentMethods=paymentMethods, totalAmount=total, active=False)
    db.session.add(new_order)
    for i in range(len(l_productId)):
        product = Products.query.get(l_productId[i])
        if product:
            new_order_detail = OrderDetails(order_id=new_order.id, product_id=product.id, price=product.price,
                                            quantity=l_quantity[i], discount=product.discount)
            db.session.add(new_order_detail)
            cart_service.remove_product_to_cart(l_cartId[i])

        db.session.commit()

def chang_active_order(order_id):
    order = db.session.query(Orders).filter_by(id=order_id).first()
    if order:
        order.active = not order.active
        order.orderComfirm= datetime.now()
        db.session.commit()
        return True
    else:
        return False


def delete_order(order_id):
    db.session.query(OrderDetails).filter_by(order_id=order_id).delete()
    order = db.session.query(Orders).filter_by(id=order_id).first()
    if order:
        db.session.delete(order)
        db.session.commit()
        return True
    else:
        return False


def get_all_orders_default():
    orders = db.session.query(
        Orders.id,
        Users.name.label('user_name'),
        BillingAddress.address.label('billing_address'),
        Shippers.companyName.label('shipper_name'),
        Orders.paymentMethods,
        Orders.orderDate,
        Orders.active,
        Orders.totalAmount
    ).join(Users, Orders.customer_id == Users.id) \
        .join(BillingAddress, Orders.billingAddress_id == BillingAddress.id) \
        .join(Shippers, Orders.shipper_id == Shippers.id) \
        .filter(Orders.active == False) \
        .all()

    order_list = []
    for order in orders:
        order_list.append({
            'id': order.id,
            'user_name': order.user_name,
            'billing_address': order.billing_address,
            'shipper_name': order.shipper_name,
            'payment_methods': order.paymentMethods,
            'order_date': order.orderDate,
            'active': order.active,
            'total_amount': order.totalAmount
        })

    return jsonify(order_list)

def get_all_orders_confirm():
    shippers_alias = aliased(Shippers)
    billing_address_alias = aliased(BillingAddress)

    orders = db.session.query(
        Orders.id,
        Users.name.label('user_name'),
        billing_address_alias.address.label('billing_address'),
        shippers_alias.companyName.label('shipper_name'),
        Orders.paymentMethods,
        Orders.orderDate,
        Orders.orderComfirm,
        Orders.active,
        Orders.totalAmount
    ).join(Users, Orders.customer_id == Users.id) \
        .outerjoin(shippers_alias, Orders.shipper_id == shippers_alias.id) \
        .outerjoin(billing_address_alias, Orders.billingAddress_id == billing_address_alias.id) \
        .filter(Orders.active == True) \
        .all()

    order_list = []
    for order in orders:
        order_list.append({
            'id': order.id,
            'user_name': order.user_name,
            'billing_address': order.billing_address,
            'shipper_name': order.shipper_name,
            'payment_methods': order.paymentMethods,
            'order_date': order.orderDate,
            'order_comfirm': order.orderComfirm,
            'active': order.active,
            'total_amount': order.totalAmount
        })

    return jsonify(order_list)



def get_order_confirm(order_id):
    shippers_alias = aliased(Shippers)
    billing_address_alias = aliased(BillingAddress)

    order = db.session.query(
        Orders.id,
        Users.name.label('user_name'),
        Users.gender,
        Users.birthDate,
        Users.phone,
        Users.email,
        Users.address.label('user_address'),
        billing_address_alias.address.label('billing_address'),
        shippers_alias.companyName.label('shipper_name'),
        shippers_alias.fee.label('shipper_fee'),
        shippers_alias.phone.label('shipper_phone'),
        Orders.paymentMethods,
        Orders.orderDate,
        Orders.orderComfirm,
        Orders.active,
        Orders.totalAmount
    ).join(Users, Orders.customer_id == Users.id) \
        .outerjoin(shippers_alias, Orders.shipper_id == shippers_alias.id) \
        .outerjoin(billing_address_alias, Orders.billingAddress_id == billing_address_alias.id) \
        .filter(Orders.id == order_id) \
        .filter(Orders.active == True) \
        .first()

    if order:
        order_data = {
            'id': order.id,
            'user_name': order.user_name,
            'gender': order.gender,
            'birth_date': order.birthDate,
            'phone': order.phone,
            'email': order.email,
            'user_address': order.user_address,
            'billing_address': order.billing_address,
            'shipper_name': order.shipper_name,
            'shipper_fee':order.shipper_fee,
            'shipper_phone': order.shipper_phone,
            'payment_methods': order.paymentMethods,
            'order_date': order.orderDate,
            'order_confirm': order.orderComfirm,
            'active': order.active,
            'total_amount': order.totalAmount
        }
        return jsonify(order_data)
    else:
        return jsonify({'message': 'Order not found'}), 404

