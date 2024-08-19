from ApiCoryn import db, ma
from ApiCoryn.model import Accounts
from ApiCoryn.schemas import AccountsSchema
from flask import jsonify, json

account_schema= AccountsSchema()
accounts_schema= AccountsSchema(many=True)

def get_all_accounts():
    accounts= Accounts.query.all()
    if accounts:
        return accounts_schema.jsonify(accounts)
    else:
        return "Not Found Account"
