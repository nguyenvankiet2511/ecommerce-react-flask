import hashlib

from flask import jsonify
from sqlalchemy.exc import NoResultFound

from ApiCoryn import db
from ApiCoryn.model import Accounts, Users, Customers, Employees, UsersRole
from ApiCoryn.schemas import AccountsSchema

account_schema = AccountsSchema()
accounts_schemas = AccountsSchema(many=True)


def get_all_account():
    account = Accounts.query.all()
    return accounts_schemas.jsonify(account)

def get_account_customer():
   accounts= Accounts.query.filter_by(users_role_id=UsersRole.CUSTOMER).all()
   return accounts_schemas.jsonify(accounts)


def get_all_accounts_info_with_avatar():
    # Lọc các tài khoản có vai trò là CUSTOMER
    accounts = Accounts.query.filter_by(users_role_id=UsersRole.CUSTOMER).all()

    if accounts:
        accounts_info = []
        for account in accounts:
            user = account.user
            avatarPath = user.photoImg
            avatar = user.photoPath
            account_info = {
                "account_id": account.id,
                "name": account.name,
                "email": account.email,
                "avatar": avatar,
                "avatarPath": avatarPath
            }
            accounts_info.append(account_info)
        return jsonify(accounts_info)
    else:
        return jsonify({"error": "No customer accounts found"}), 404


def get_account_by_id(id):
    account = db.session.query(Accounts).filter(Accounts.id == id).first()
    return account_schema.jsonify(account)


def chang_active_account(id):
    account = db.session.query(Accounts).filter(Accounts.id == id).first()
    if account:
        account.active = not account.active
        db.session.commit()
        return True
    else:
        return False


def remove_account(id):
    account = db.session.query(Accounts).filter(Accounts.id == id).first()
    if account:
        db.session.delete(account)
        db.session.commit()
        return True
    else:
        return False


def username_exists(username):
    account = db.session.query(Accounts).filter_by(username=username).first()
    if account:
        return True
    else:
        return False
def email_exists(email):
    account = db.session.query(Accounts).filter_by(email=email).first()
    if account:
        return True
    else:
        return False

def add_account(name, username, password, email, user_role_id):
    hashed_password = hashlib.md5(password.encode('utf-8')).hexdigest()
    user = Users(name=name, email=email)
    db.session.add(user)
    db.session.commit()
    print(user_role_id)
    if user_role_id == 3:

        customer = Customers(id=user.id)
        db.session.add(customer)
        account = Accounts(name=name, username=username, password=hashed_password, email=email, user_id=user.id)
        db.session.add(account)
        db.session.commit()
    else:
        employee = Employees(id=user.id)
        db.session.add(employee)
        hashed_password = hashlib.md5(password.encode('utf-8')).hexdigest()
        if user_role_id == 1:
            account = Accounts(name=name, username=username, password=hashed_password, email=email, user_id=user.id,
                               users_role_id=UsersRole.ADMIN)
            db.session.add(account)
            db.session.commit()
        else:
            account = Accounts(name=name, username=username, password=hashed_password, email=email, user_id=user.id,
                               users_role_id=UsersRole.EMPLOYEE)
            db.session.add(account)
            db.session.commit()
def add_account_customer(fullName, username, password, email):
    hashed_password = hashlib.md5(password.encode('utf-8')).hexdigest()
    user = Users(name=fullName, email=email)
    db.session.add(user)
    db.session.commit()
    customer = Customers(id=user.id)
    db.session.add(customer)
    account = Accounts(name=fullName, username=username, password=hashed_password, email=email, user_id=user.id)
    db.session.add(account)
    db.session.commit()
    return  account
