from sqlalchemy.orm import joinedload

from ApiCoryn import db
from ApiCoryn.model import Products, Categories, FeedbackProduct, Accounts
from ApiCoryn.schemas import ProductsSchema
from flask import request, jsonify
from datetime import datetime


def get_feedback_product(product_id):
    feedbacks = (
        db.session.query(FeedbackProduct)
        .filter(FeedbackProduct.product_id == product_id)
        .options(
            joinedload(FeedbackProduct.account).joinedload(Accounts.user)
        )
        .all()
    )
    feedback_list = []
    for feedback in feedbacks:
        feedback_data = {
            "user_name": feedback.account.user.name,
            "user_photo": feedback.account.user.photoPath,
            "rating": feedback.rating,
            "comment": feedback.comment,
            "create_date": feedback.createDate
        }
        feedback_list.append(feedback_data)
    return feedback_list

def create_feedback_product(user_id, comment, rating, productId):
    feedback= FeedbackProduct(user_id=user_id, comment=comment,rating=rating,product_id= productId)
    db.session.add(feedback)
    db.session.commit()
    return  feedback