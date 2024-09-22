from ApiCoryn import db
from ApiCoryn.model import Accounts, Users
from ApiCoryn.schemas import AccountsSchema, UsersSchema
from flask import jsonify, json
import hashlib
import google.auth.transport.requests
from pip._vendor import cachecontrol
import requests, os
from flask import request, session, jsonify
from google.oauth2 import id_token
from ApiCoryn import db, flow

import hashlib, datetime

account_schema= AccountsSchema()
accounts_schema= AccountsSchema(many=True)

user_schema= UsersSchema()
users_schema= UsersSchema(many=True)

def get_user_oauth():
    flow.fetch_token(authorization_response=request.url)

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    user_oauth = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=os.getenv("547179285836-12r4b76q1d1nr32u4prmu6jgl51lpklg.apps.googleusercontent.com")
    )
    return user_oauth
def get_all_accounts():
    accounts= Accounts.query.all()
    if accounts:
        return accounts_schema.jsonify(accounts)
    else:
        return "Not Found Account"
def auth_user(username, password):
    password = str(hashlib.md5(password.strip().encode('utf-8')).hexdigest())
    return Accounts.query.filter(Accounts.username.__eq__(username.strip()), Accounts.password.__eq__(password)).first()

def get_inf_user(id):
    user = Users.query.filter(Users.id == id).first()
    return user_schema.jsonify(user)


def update_inf_user(user_id, name, phone, birthday, photoPath, address):
    user = Users.query.get(user_id)
    if user:
        user.name = name
        user.phone = phone
        user.birthday = birthday
        user.photoPath = photoPath
        user.address = address
        db.session.commit()
        return True  
    return False

