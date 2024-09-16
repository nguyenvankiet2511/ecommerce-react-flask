from ApiCoryn import db
from ApiCoryn.model import Carts, Products
from flask import jsonify


def get_count_cart(user_id):
    return Carts.query.filter(Carts.customer_id == user_id).count()
def add_to_cart(user_id, product_id, quantity):
    cart= Carts(customer_id=user_id, product_id=product_id, quantity=quantity)
    db.session.add(cart)
    db.session.commit()


def update_quantity_cart(cart_id, new_quantity):
    cart_item = Carts.query.get(cart_id)
    if cart_item:
        cart_item.quantity = new_quantity
        db.session.commit()
    else:
        raise ValueError("Cart item not found")


def remove_product_to_cart(id):
    # Tìm sản phẩm trong giỏ hàng dựa trên id
    cart = Carts.query.filter(Carts.id == id).first()

    # Nếu sản phẩm tồn tại trong giỏ hàng, thì xóa nó
    if cart:
        db.session.delete(cart)
        db.session.commit()
        print(f"Sản phẩm với ID {id} đã được xóa khỏi giỏ hàng.")
    else:
        print(f"Sản phẩm với ID {id} không tồn tại trong giỏ hàng.")
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

