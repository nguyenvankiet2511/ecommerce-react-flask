from ApiCoryn import db
from ApiCoryn.model import Shippers
from ApiCoryn.schemas import ShippersSchema
from flask import request, jsonify
from datetime import datetime

shipper_schemas= ShippersSchema()
shippers_schemas= ShippersSchema(many=True)

def get_all_shipper():
    shippers= Shippers.query.all()
    return shippers_schemas.jsonify(shippers)

def get_fee(id):
    shipper= Shippers.query.get(id)
    return shipper_schemas.jsonify(shipper)