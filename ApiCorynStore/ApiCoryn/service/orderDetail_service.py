from datetime import datetime

from flask import jsonify
from sqlalchemy import desc, case
from sqlalchemy.orm import aliased, joinedload

from ApiCoryn import db
from ApiCoryn.model import Orders, Products, OrderDetails, Customers, Users, BillingAddress, Shippers
from ApiCoryn.service import cart_service, products_service


def get_order_detail(order_id):
    order_details = db.session.query(
        OrderDetails.id,
        Products.name.label('product_name'),
        Products.imageProduct.label('product_image'),
        OrderDetails.quantity,
        OrderDetails.price,
        OrderDetails.discount
    ).join(Products, OrderDetails.product_id == Products.id) \
        .filter(OrderDetails.order_id == order_id) \
        .all()

    if not order_details:
        return jsonify({'message': 'No details found for this order'}), 404

    details_list = []
    for detail in order_details:
        details_list.append({
            'id': detail.id,
            'product_name': detail.product_name,
            'product_image': detail.product_image,
            'quantity': detail.quantity,
            'price': detail.price,
            'discount': detail.discount
        })

    return jsonify(details_list)


def delete_order_detail(id):
    order_detail = db.session.query(OrderDetails).filter_by(id=id).first()
    if order_detail:
        db.session.delete(order_detail)
        db.session.commit()
        return True
    else:
        return False


def change_order_detail(order_id, l_quantity, l_price, l_discount, l_order_detail_id):
    total_price = 0  # Khởi tạo tổng tiền
    for i in range(len(l_order_detail_id)):
        order_detail_id = l_order_detail_id[i]
        order_detail = OrderDetails.query.filter_by(id=order_detail_id).first()
        if order_detail:
            order_detail.quantity = l_quantity[i]
            order_detail.price = l_price[i]
            order_detail.discount = l_discount[i]

            # Tính tổng tiền với discount là %
            total_price += (order_detail.quantity * order_detail.price) * (1 - order_detail.discount / 100)
            db.session.commit()
        else:
            return False

        order = Orders.query.filter_by(id=order_id).first()
        order.totalAmount = total_price
        db.session.commit()

    return True


def get_orders_with_products(customer_id):
    orders = (
        Orders.query
        .options(
            joinedload(Orders.order_details).joinedload(OrderDetails.product)
        )
        .filter_by(customer_id=customer_id)
        .order_by(
            case(
                (Orders.active == False, 0),  # Đơn hàng không hoạt động sẽ được xếp trước
                else_=1
            ),
            desc(Orders.orderDate)  # Sắp xếp theo orderDate giảm dần
        )
        .all()
    )
    orders_list = [order_to_dict(order) for order in orders]
    return orders_list


def order_detail_to_dict(order_detail):
    return {
        'product_id': order_detail.product_id,
        'product_name': order_detail.product.name,
        'quantity': order_detail.quantity,
        'price': order_detail.price,
        'discount': order_detail.discount,
        'imageProduct': order_detail.product.imageProduct
    }

def order_to_dict(order):
    return {
        'order_id': order.id,
        'customer_id': order.customer_id,
        'paymentMethods': order.paymentMethods,
        'orderDate': order.orderDate,
        'orderConfirm': order.orderComfirm,
        'totalAmount': order.totalAmount,
        'active': order.active,
        'order_details': [order_detail_to_dict(detail) for detail in order.order_details]
    }



