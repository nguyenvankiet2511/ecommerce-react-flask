from ApiCoryn import app
from ApiCoryn.service import users_service,categories_service, products_service
from ApiCoryn.model import UsersRole,Accounts
from flask_security import login_user, current_user
from werkzeug.security import check_password_hash
from flask import render_template, session, flash, jsonify, redirect, request


@app.route("/", methods=['GET'])
def load_login():
    return users_service.get_all_accounts()

@app.route("/login", methods=['POST'])
def auth_login():
    data = request.get_json()  # Nhận dữ liệu JSON từ yêu cầu POST

    username = data.get('username')
    password = data.get('password')

    # Kiểm tra dữ liệu đầu vào
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Tìm người dùng trong cơ sở dữ liệu
    user = Accounts.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        login_user(user)  # Đăng nhập người dùng
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401


# API Categories------------------------------------------>
@app.route("/categories", methods=['GET'])
def view_category():
    return categories_service.get_all_categories()
@app.route("/categories/<categoryId>", methods= ['GET'])
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
#API Products-------------------------------------------->
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
if __name__ == "__main__":
    app.run(debug=True)