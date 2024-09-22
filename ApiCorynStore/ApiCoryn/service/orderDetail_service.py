from datetime import datetime

from flask import jsonify
from sqlalchemy.orm import aliased

from ApiCoryn import db
from ApiCoryn.model import Orders, Products, OrderDetails,Customers,Users, BillingAddress,Shippers
from ApiCoryn.service import cart_service,products_service


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