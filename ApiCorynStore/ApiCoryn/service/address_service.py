from ApiCoryn import db
from ApiCoryn.model import BillingAddress
from ApiCoryn.schemas import BillingAddressSchema


address_schema= BillingAddressSchema()
address_schemas= BillingAddressSchema(many=True)

def get_all_address_by_id(id):
    l_address = BillingAddress.query.filter(BillingAddress.customer_id == id).all()
    return address_schemas.jsonify(l_address, many=True)


def create_address_new(name, address, address_detail, customer_id, phone):
    address=BillingAddress(name=name, phone=phone, address=address,
                   addressDetail=address_detail, customer_id=customer_id)
    db.session.add(address)
    db.session.commit()
