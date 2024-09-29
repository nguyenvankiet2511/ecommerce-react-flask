from sqlalchemy.orm import joinedload

from ApiCoryn import db
from ApiCoryn.model import Products, Categories
from ApiCoryn.schemas import ProductsSchema
from flask import request, jsonify
from datetime import datetime

product_schema = ProductsSchema()
products_schema = ProductsSchema(many=True)


def get_all_products():
    products = Products.query.all()
    return products_schema.jsonify(products)


def get_product(id):
    product = Products.query.get(id)
    return product_schema.jsonify(product)


def get_products_with_category():
    products = db.session.query(Products).join(Categories).all()

    product_list = []
    for product in products:
        product_info = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'description': product.description,
            'imageProduct': product.imageProduct,
            'unitsInStock': product.unitsInStock,
            'discount': product.discount,
            'createdDate': product.createdDate,
            'updatedDate': product.updatedDate,
            'category_name': product.category.name,
            'active': product.active
        }
        product_list.append(product_info)
    return jsonify(product_list)


def get_products_by_categoryId(categoryId):
    products = Products.query.filter_by(category_id=categoryId).all()
    return products_schema.jsonify((products))


def get_product_by_name(name):
    products = Products.query.filter(Products.name.contains(name))  # Tìm kiếm sản phẩm theo tên
    return products_schema.jsonify(products)  # Trả về danh sách các sản phẩm tìm được


# def get_product_by_name_and_price(name, price):
#     products = Products.query.filter(
#         Products.name.ilike(f"%{name}%"),
#         Products.price <= price
#     ).all()
#     return products_schema.jsonify(products)
def get_product_by_name_and_price():
    # Lấy giá trị từ yêu cầu GET
    name = request.args.get('name', '')
    price = request.args.get('price', None)
    query = Products.query.filter(Products.name.contains(name))
    if price is not None:
        try:
            price = float(price)
            query = query.filter(Products.price <= price)
        except ValueError:
            return jsonify({"message": "Invalid price value"}), 400
    products = query.all()
    return products_schema.jsonify(products)


def add_product():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400

    required_fields = ['name', 'price', 'description', 'imageProduct', 'category_id', 'unitsInStock', 'discount']
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"Missing field: {field}"}), 400
    new_product = Products(
        name=data['name'],
        price=data['price'],
        description=data['description'],
        imageProduct=data['imageProduct'],
        category_id=data['category_id'],
        unitsInStock=data['unitsInStock'],
        discount=data['discount'],
        createdDate=datetime.utcnow(),  # Thời gian hiện tại
        updatedDate=datetime.utcnow()  # Thời gian hiện tại
    )
    db.session.add(new_product)
    db.session.commit()
    result = product_schema.jsonify(new_product)
    return result, 201


def change_active_product(product_id):
    product = db.session.query(Products).filter(Products.id == product_id).first()
    if product:
        product.active = not product.active
        db.session.commit()
        status = "đang sử dụng" if product.active else "ngừng sử dụng"
        return jsonify({"message": f"Product status changed to {status} successfully!"}), 200
    else:
        return jsonify({"error": "Product not found!"}), 404




def get_price_product(product_id):
    product = Products.query.filter_by(id=product_id).first()
    if product:
        discounted_price = product.price * (1 - product.discount / 100)
        return discounted_price
    return 0


def get_product_by_id(id):
    return Products.query.filter(Products.id.__eq__(id)).first()

