from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Numeric, Text
from sqlalchemy.orm import relationship

db = SQLAlchemy()


class UsersRole(db.Model, RoleMixin):
    __tablename__ = 'users_role'
    id = Column(Integer, primary_key=True)
    name = Column(String(80), unique=True)
    description = Column(String(255))

    accounts = relationship('Accounts', secondary='accounts_roles', back_populates='roles')


class Accounts(db.Model, UserMixin):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    email = Column(String(255), unique=True)
    username = Column(String(50), unique=True)
    password = Column(String(255))
    active = Column(Boolean)
    fs_uniquifier = Column(String(255), unique=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    roles = relationship('UsersRole', secondary='accounts_roles', back_populates='accounts')

    feedback_customers = relationship("FeedbackCustomers", backref="account")
    messages = relationship("Messages", backref="account")
    feedback_products = relationship("FeedbackProduct", backref="account")


class AccountsRoles(db.Model):
    __tablename__ = 'accounts_roles'
    id = Column(Integer, primary_key=True)
    account_id = Column(Integer, ForeignKey('accounts.id', ondelete='CASCADE'))
    role_id = Column(Integer, ForeignKey('users_role.id', ondelete='CASCADE'))


class Users(db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    gender = Column(Boolean)
    birthDate = Column(DateTime)
    phone = Column(String(12))
    email = Column(String(255))
    address = Column(String(255))
    photoInf = Column(Text)
    photoPath = Column(String(255))

    account = relationship('Accounts', backref='user', lazy=True)
    employees = relationship("Employees", uselist=False, back_populates="user")
    customers = relationship("Customers", uselist=False, back_populates="user")


class Employees(db.Model):
    __tablename__ = 'employees'
    id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    degree = Column(String(150), default="Không")

    user = relationship("Users", back_populates="employees")
    orders = relationship("Orders", backref="employee")
    order_returns = relationship("OrderReturn", backref="employee")


class Customers(db.Model):
    __tablename__ = 'customers'
    id = Column(Integer, ForeignKey('users.id'), primary_key=True)

    user = relationship("Users", back_populates="customers")
    billing_addresses = relationship("BillingAddress", backref="customer")
    orders = relationship("Orders", backref="customer")
    carts = relationship("Carts", backref="customer")


class BillingAddress(db.Model):
    __tablename__ = 'billing_address'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    phone = Column(String(12), nullable=False)
    address = Column(Text)
    addressDetail = Column(Text)
    customer_id = Column(Integer, ForeignKey('customers.id'), nullable=False)

    order = relationship("Orders", backref="billing_address")


class Categories(db.Model):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False, unique=True)
    photoCategory = Column(String(255), nullable=False)
    products = relationship("Products", backref="category")


class Products(db.Model):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    price = Column(Numeric)
    description = Column(Text)
    imageProduct = Column(String(255))
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    unitsInStock = Column(Integer, default=0)
    discount = Column(Integer, default=0)
    createdDate = Column(DateTime)
    updatedDate = Column(DateTime)

    feedback_products = relationship("FeedbackProduct", backref="product")
    order_details = relationship("OrderDetails", backref="product")
    carts = relationship("Carts", backref="product")


class FeedbackCustomers(db.Model):
    __tablename__ = 'feedback_customers'
    id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(Integer, ForeignKey('accounts.id'), nullable=False)
    comment = Column(Text)


class FeedbackProduct(db.Model):
    __tablename__ = 'feedback_product'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('accounts.id'))
    product_id = Column(Integer, ForeignKey('products.id'))
    rating = Column(Integer)
    comment = Column(Text)


class Shippers(db.Model):
    __tablename__ = 'shippers'
    id = Column(Integer, primary_key=True, autoincrement=True)
    companyName = Column(String(255), nullable=False)
    phone = Column(String(12))

    orders = relationship("Orders", backref="shipper")


class Orders(db.Model):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey('customers.id'), nullable=False)
    employee_id = Column(Integer, ForeignKey('employees.id'), nullable=False)
    shipper_id = Column(Integer, ForeignKey('shippers.id'), nullable=False)
    billingAddress_id = Column(Integer, ForeignKey('billing_address.id'), nullable=False)
    paymentMethods = Column(String(150), default="Thanh toán khi nhận hàng")
    orderDate = Column(DateTime)
    active = Column(Boolean)
    totalAmount = Column(Numeric)

    order_details = relationship("OrderDetails", backref="order")
    order_returns = relationship("OrderReturn", backref="order")


class OrderDetails(db.Model):
    __tablename__ = 'order_details'
    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey('orders.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer)
    price = Column(Numeric)
    discount = Column(Integer, default=0)


class Carts(db.Model):
    __tablename__ = 'carts'
    id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey('customers.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer)
    price = Column(Numeric)
    discount = Column(Integer)


class Messages(db.Model):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(Integer, ForeignKey('accounts.id'), nullable=False)
    content = Column(Text)


class OrderReturn(db.Model):
    __tablename__ = 'order_return'
    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey('orders.id'), nullable=False)
    reason = Column(Text)
    returnDate = Column(DateTime)
    active = Column(Boolean)
    status = Column(String(50), default="Đang chờ xử lý")
    employee_id = Column(Integer, ForeignKey('employees.id'))
    processedDate = Column(DateTime)