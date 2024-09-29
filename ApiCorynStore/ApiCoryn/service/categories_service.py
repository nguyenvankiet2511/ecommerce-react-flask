from ApiCoryn import db
from ApiCoryn.model import Categories
from ApiCoryn.schemas import CategoriesSchema
from flask import request

category_schema = CategoriesSchema()
categories_schema = CategoriesSchema(many=True)


def get_all_categories():
    categories = Categories.query.all()
    return categories_schema.jsonify(categories)

def get_categories(id):
    # Filter by the category ID, assuming 'id' is the primary key column
    category = Categories.query.filter_by(id=id).first()  # Use filter_by for clarity
    if category:
        return category_schema.jsonify(category)
    else:
        return None
def create_categories(name, photoCategory, description):
    category = Categories(name=name, photoCategory=photoCategory)
    db.session.add(category)
    db.session.commit()
    return category_schema.jsonify(category)


def update_category(id):
    category = Categories.query.get(id)
    name = request.json['name']
    photoCategory = request.json['photoCategory']

    category.name = name
    category.photoCategory = photoCategory

    db.session.commit()
    return category_schema.jsonify(category)


def delete_category():
    category = Categories.query.get(id)
    db.session.delete(category)
    db.session.commit()
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}