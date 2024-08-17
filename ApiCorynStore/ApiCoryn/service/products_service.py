from ApiCorynStore.ApiCoryn import db
from ApiCorynStore.ApiCoryn.model import Products
from ApiCorynStore.ApiCoryn.schemas import ProductsSchema
from flask import request, jsonify
from datetime import datetime
product_schema = ProductsSchema()
products_schema = ProductsSchema(many=True)

def get_all_products():
    products= Products.query.limit(8).all()
    return  products_schema.jsonify(products)
def get_product(id):
    product= Products.query.get(id)
    return product_schema.jsonify(product)
def get_product_by_name(name):
    products = Products.query.filter(Products.name.contains(name)) # Tìm kiếm sản phẩm theo tên
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
        updatedDate=datetime.utcnow()   # Thời gian hiện tại
    )
    db.session.add(new_product)
    db.session.commit()
    result = product_schema.jsonify(new_product)
    return result, 201

