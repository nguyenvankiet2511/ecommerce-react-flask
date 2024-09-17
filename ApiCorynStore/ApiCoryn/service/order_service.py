from ApiCoryn import db
from ApiCoryn.model import Orders, Products, OrderDetails
from ApiCoryn.service import cart_service


def create_order_customer(customer_id, address_id, shipper_id, total, paymentMethods, l_productId, l_quantity, l_cartId):
    new_order = Orders(customer_id=customer_id, shipper_id=shipper_id, billingAddress_id=address_id,
                       paymentMethods=paymentMethods, totalAmount=total, active=False)
    db.session.add(new_order)
    for i in range(len(l_productId)):
        product = Products.query.get(l_productId[i])
        if product:
            new_order_detail = OrderDetails(order_id=new_order.id, product_id=product.id, price=product.price,
                                            quantity=l_quantity[i], discount=product.discount)
            db.session.add(new_order_detail)
            cart_service.remove_product_to_cart(l_cartId[i])

        db.session.commit()
