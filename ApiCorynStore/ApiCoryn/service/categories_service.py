from ApiCorynStore.ApiCoryn import db
from ApiCorynStore.ApiCoryn.model import Categories
from ApiCorynStore.ApiCoryn.schemas import CategoriesSchema
from flask import request
category_schema = CategoriesSchema()
categories_schema = CategoriesSchema(many=True)

def get_all_categories():
    categories= Categories.query.all()
    return categories_schema.jsonify(categories)
def create_categories():
    id= request.json['id']
    name= request.json['name']
    photoCategory= request.json['photoCategory']
    category= Categories( id= id, name= name, photoCategory=photoCategory)
    db.session.add(category)
    db.session.commit()
    return category_schema.jsonify(category)
def update_category(id):
    category= Categories.query.get(id)
    name = request.json['name']
    photoCategory = request.json['photoCategory']

    category.name= name
    category.photoCategory= photoCategory

    db.session.commit()
    return category_schema.jsonify(category)

def delete_category():
    category= Categories.query.get(id)
    db.session.delete(category)
    db.session.commit()

