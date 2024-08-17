from ApiCorynStore.ApiCoryn import app
from ApiCorynStore.ApiCoryn.service import users_service,categories_service, products_service
from ApiCorynStore.ApiCoryn.model import UsersRole,Accounts
from flask import render_template, session, flash, jsonify, redirect, request, url_for
from flask_login import login_user, current_user, logout_user


@app.route("/", methods=['GET'])
def load_login():
    return users_service.get_all_accounts()
# API Categories------------------------------------------>
@app.route("/categories", methods=['GET'])
def view_category():
    return categories_service.get_all_categories()
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