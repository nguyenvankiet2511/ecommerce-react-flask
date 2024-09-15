from ApiCoryn import db
from ApiCoryn.model import Carts, Products
from flask import jsonify

def get_products_to_cart(user_id):
    results = db.session.query(
        Products.id.label('product_id'),
        Products.name.label('product_name'),
        Products.description.label('product_description'),
        Products.imageProduct.label('product_images'),
        Products.discount.label('product_discount'),
        Products.price.label('product_price'),
        Carts.quantity,
        Carts.id.label('cart_id')
    ).join(Carts, Products.id == Carts.product_id) \
     .filter(Carts.customer_id == user_id) \
     .all()
    products_list = [
        {
            'product_id': result.product_id,
            'product_name': result.product_name,
            'product_description': result.product_description,
            'product_images': result.product_images,
            'product_discount': result.product_discount,
            'product_price': result.product_price,
            'quantity': result.quantity,
            'cart_id': result.cart_id
        }
        for result in results
    ]

    return products_list

