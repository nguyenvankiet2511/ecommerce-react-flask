import hashlib
from ApiCoryn import db, app
from enum import Enum as UserEnum
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Numeric, Text,Enum
from sqlalchemy.orm import relationship, backref
from datetime import datetime

class UsersRole(UserEnum):
    ADMIN = 1
    EMPLOYEE = 2
    CUSTOMER = 3

class Accounts(db.Model, UserMixin):
    __tablename__ = 'Accounts'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    email = Column(String(255), unique=True)
    username = Column(String(50), unique=True)
    password = Column(String(255))
    active = Column(Boolean)
    users_role_id = Column(Enum(UsersRole), default=UsersRole.CUSTOMER)
    user_id = Column(Integer, ForeignKey('Users.id'), nullable=False)

    # Đổi tên backref để tránh xung đột
    feedback_customers = relationship("FeedbackCustomers", backref="account")
    messages = relationship("Messages", backref="account")
    feedback_products = relationship("FeedbackProduct", backref="account")


class Users(db.Model):
    __tablename__ = 'Users'
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
    __tablename__ = 'Employees'

    id = Column(Integer, ForeignKey('Users.id'), primary_key=True)
    degree = Column(String(150), default="Không")
    # ///
    user = relationship("Users", back_populates="employees")
    orders = relationship("Orders", backref="employee")
    order_returns = relationship("OrderReturn", backref="employee")


class Customers(db.Model):
    __tablename__ = 'Customers'

    id = Column(Integer, ForeignKey('Users.id'), primary_key=True)

    user = relationship("Users", back_populates="customers")
    billing_addresses = relationship("BillingAddress", backref="customer")
    orders = relationship("Orders", backref="customer")
    carts = relationship("Carts", backref="customer")


class BillingAddress(db.Model):
    __tablename__ = 'BillingAddress'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    phone = Column(String(12), nullable=False)
    address = Column(Text)
    addressDetail = Column(Text)
    customer_id = Column(Integer, ForeignKey('Customers.id'), nullable=False)

    order = relationship("Orders", backref="billing_address")


class Categories(db.Model):
    __tablename__ = 'Categories'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False, unique=True)
    photoCategory= Column(String(255), nullable=False)
    products = relationship("Products", backref="category")


class Products(db.Model):
    __tablename__ = 'Products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    price = Column(Numeric)
    description = Column(Text)
    imageProduct = Column(String(255))
    category_id = Column(Integer, ForeignKey('Categories.id'), nullable=False)
    unitsInStock = Column(Integer, default=0)
    discount = Column(Integer, default=0)
    createdDate = Column(DateTime)
    updatedDate = Column(DateTime)

    feedback_products = relationship("FeedbackProduct", backref="product")
    order_details = relationship("OrderDetails", backref="product")
    carts = relationship("Carts", backref="product")


class FeedbackCustomers(db.Model):
    __tablename__ = 'FeedbackCustomers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(Integer, ForeignKey('Accounts.id'), nullable=False)
    comment = Column(Text)


class FeedbackProduct(db.Model):
    __tablename__ = 'FeedbackProduct'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('Accounts.id'))
    product_id = Column(Integer, ForeignKey('Products.id'))
    rating = Column(Integer)
    comment = Column(Text)


class Shippers(db.Model):
    __tablename__ = 'Shippers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    companyName = Column(String(255), nullable=False)
    phone = Column(String(12))

    orders = relationship("Orders", backref="shipper")


class Orders(db.Model):
    __tablename__ = 'Orders'

    id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey('Customers.id'), nullable=False)
    employee_id = Column(Integer, ForeignKey('Employees.id'), nullable=False)
    shipper_id = Column(Integer, ForeignKey('Shippers.id'), nullable=False)
    billingAddress_id = Column(Integer, ForeignKey('BillingAddress.id'), nullable=False)
    paymentMethods = Column(String(150), default="Thanh toán khi nhận hàng")
    orderDate = Column(DateTime)
    active = Column(Boolean)
    totalAmount = Column(Numeric)

    order_details = relationship("OrderDetails", backref="order")
    order_returns = relationship("OrderReturn", backref="order")


class OrderDetails(db.Model):
    __tablename__ = 'OrderDetails'

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey('Orders.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('Products.id'), nullable=False)
    quantity = Column(Integer)
    price = Column(Numeric)
    discount = Column(Integer, default=0)


class Carts(db.Model):
    __tablename__ = 'Carts'

    id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey('Customers.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('Products.id'), nullable=False)
    quantity = Column(Integer)
    price = Column(Numeric)
    discount = Column(Integer)


class Messages(db.Model):
    __tablename__ = 'Messages'

    id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(Integer, ForeignKey('Accounts.id'), nullable=False)
    content = Column(Text)


class OrderReturn(db.Model):
    __tablename__ = 'OrderReturn'

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey('Orders.id'), nullable=False)
    reason = Column(Text)
    returnDate = Column(DateTime)
    active = Column(Boolean)
    status = Column(String(50), default="Đang chờ xử lý")
    employee_id = Column(Integer, ForeignKey('Employees.id'))
    processedDate = Column(DateTime)





if __name__ == '__main__':
    with app.app_context():
        #db.drop_all()
        # db.create_all()
        # db.session.commit()


        # users_data = [
        #     Users(name="John Doe", gender=True, birthDate=datetime(1980, 5, 15), phone="123-456-7890",
        #           email="john.doe@example.com", address="123 Elm St", photoInf="photo1", photoPath="/photos/john.jpg"),
        #     Users(name="Jane Smith", gender=False, birthDate=datetime(1990, 8, 22), phone="234-567-8901",
        #           email="jane.smith@example.com", address="456 Oak St", photoInf="photo2",
        #           photoPath="/photos/jane.jpg"),
        #     Users(name="Alice Johnson", gender=True, birthDate=datetime(1985, 12, 30), phone="345-678-9012",
        #           email="alice.johnson@example.com", address="789 Pine St", photoInf="photo3",
        #           photoPath="/photos/alice.jpg"),
        #     Users(name="Bob Brown", gender=True, birthDate=datetime(1975, 3, 5), phone="456-789-0123",
        #           email="bob.brown@example.com", address="101 Maple St", photoInf="photo4",
        #           photoPath="/photos/bob.jpg"),
        #     Users(name="Emily Davis", gender=False, birthDate=datetime(1988, 7, 19), phone="567-890-1234",
        #           email="emily.davis@example.com", address="202 Birch St", photoInf="photo5",
        #           photoPath="/photos/emily.jpg"),
        #     Users(name="Michael Wilson", gender=True, birthDate=datetime(1995, 11, 25), phone="678-901-2345",
        #           email="michael.wilson@example.com", address="303 Cedar St", photoInf="photo6",
        #           photoPath="/photos/michael.jpg"),
        #     Users(name="Olivia Lee", gender=False, birthDate=datetime(1992, 2, 14), phone="789-012-3456",
        #           email="olivia.lee@example.com", address="404 Spruce St", photoInf="photo7",
        #           photoPath="/photos/olivia.jpg"),
        #     Users(name="James Miller", gender=True, birthDate=datetime(1983, 9, 9), phone="890-123-4567",
        #           email="james.miller@example.com", address="505 Fir St", photoInf="photo8",
        #           photoPath="/photos/james.jpg"),
        #     Users(name="Sophia Taylor", gender=False, birthDate=datetime(2000, 4, 21), phone="901-234-5678",
        #           email="sophia.taylor@example.com", address="606 Redwood St", photoInf="photo9",
        #           photoPath="/photos/sophia.jpg"),
        #     Users(name="Liam Anderson", gender=True, birthDate=datetime(1987, 10, 30), phone="012-345-6789",
        #           email="liam.anderson@example.com", address="707 Sequoia St", photoInf="photo10",
        #           photoPath="/photos/liam.jpg"),
        # ]
        # db.session.add_all(users_data)
        # db.session.commit()
        # # Emplyoee
        # employees_data = [
        #     Employees(id=1),
        #     Employees(id=2),
        #     Employees(id=3),
        #     Employees(id=4),
        #     Employees(id=5)
        #
        # ]
        # db.session.add_all(employees_data)
        # db.session.commit()
        # #
        # customers_data = [
        #     Customers(id=6),
        #     Customers(id=7),
        #     Customers(id=8),
        #     Customers(id=9),
        #     Customers(id=10)
        # ]
        # db.session.add_all(customers_data)
        # db.session.commit()
        # #
        # categories_data = [
        #     Categories(name='Áo sơ mi', photoCategory='photo1'),
        #     Categories(name='Quần jeans', photoCategory='photo1'),
        #     Categories(name='Áo khoác', photoCategory='photo1'),
        #     Categories(name='Giày thể thao' ,photoCategory='photo1'),
        #     Categories(name='Phụ kiện thời trang', photoCategory='photo1')
        # ]
        # # Thêm dữ liệu vào cơ sở dữ liệu
        # db.session.add_all(categories_data)
        # db.session.commit()


        products_data = [
            Products(name='Áo sơ mi trắng', price=299000, description='Áo sơ mi trắng chất liệu cotton cao cấp',
                     imageProduct='shirt-5.jpg', category_id=1, unitsInStock=50, discount=10,
                     createdDate=datetime(2024, 1, 1), updatedDate=datetime(2024, 8, 1)),
            Products(name='Áo sơ mi xanh', price=319000, description='Áo sơ mi xanh dương nhẹ nhàng',
                     imageProduct='shirt-3.jpg', category_id=1, unitsInStock=30, discount=5,
                     createdDate=datetime(2024, 1, 10), updatedDate=datetime(2024, 8, 2)),
            Products(name='Áo sơ mi kẻ sọc', price=329000, description='Áo sơ mi kẻ sọc hiện đại',
                     imageProduct='shirt-6.jpg', category_id=1, unitsInStock=20, discount=15,
                     createdDate=datetime(2024, 2, 1), updatedDate=datetime(2024, 8, 3)),
            Products(name='Áo sơ mi họa tiết', price=339000, description='Áo sơ mi họa tiết đa dạng',
                     imageProduct='shirt-7.jpg', category_id=1, unitsInStock=45, discount=15,
                     createdDate=datetime(2024, 7, 1), updatedDate=datetime(2024, 8, 12)),

            Products(name='Quần jeans xanh', price=399000, description='Quần jeans chất liệu denim bền bỉ',
                     imageProduct='trousers-2.jpg', category_id=2, unitsInStock=40, discount=20,
                     createdDate=datetime(2024, 3, 1), updatedDate=datetime(2024, 8, 4)),
            Products(name='Quần jeans đen', price=419000, description='Quần jeans đen thời trang',
                     imageProduct='trousers-1.jpg', category_id=2, unitsInStock=35, discount=25,
                     createdDate=datetime(2024, 3, 10), updatedDate=datetime(2024, 8, 5)),
            Products(name='Quần shorts', price=349000, description='Quần shorts mùa hè thoải mái',
                     imageProduct='trousers-3.jpg', category_id=2, unitsInStock=50, discount=10,
                     createdDate=datetime(2024, 7, 10), updatedDate=datetime(2024, 8, 13)),

            Products(name='Áo khoác da', price=799000, description='Áo khoác da cao cấp cho mùa đông',
                     imageProduct='shirt-8.jpg', category_id=3, unitsInStock=25, discount=30,
                     createdDate=datetime(2024, 4, 1), updatedDate=datetime(2024, 8, 6)),
            Products(name='Áo khoác bomber', price=729000, description='Áo khoác bomber kiểu dáng trẻ trung',
                     imageProduct='shirt-4.jpg', category_id=3, unitsInStock=30, discount=10,
                     createdDate=datetime(2024, 4, 15), updatedDate=datetime(2024, 8, 7)),
            Products(name='Áo khoác denim', price=749000, description='Áo khoác denim trẻ trung',
                     imageProduct='shirt-2.jpg', category_id=3, unitsInStock=20, discount=5,
                     createdDate=datetime(2024, 8, 1), updatedDate=datetime(2024, 8, 14)),
            Products(name='Áo khoác hoodie', price=669000, description='Áo khoác hoodie ấm áp',
                     imageProduct='shirt-9.jpg', category_id=3, unitsInStock=45, discount=15,
                     createdDate=datetime(2024, 9, 1), updatedDate=datetime(2024, 8, 17)),

            Products(name='Giày thể thao hồng', price=899000, description='Giày thể thao hồng năng động',
                     imageProduct='shoes-8.png', category_id=4, unitsInStock=50, discount=5,
                     createdDate=datetime(2024, 5, 1), updatedDate=datetime(2024, 8, 8)),
            Products(name='Giày thể thao đen', price=919000, description='Giày thể thao đen cá tính',
                     imageProduct='shoes-6.jpg', category_id=4, unitsInStock=40, discount=10,
                     createdDate=datetime(2024, 5, 10), updatedDate=datetime(2024, 8, 9)),
            Products(name='Giày lười', price=699000, description='Giày lười thanh lịch', imageProduct='shoes-1.png',
                     category_id=4, unitsInStock=35, discount=20, createdDate=datetime(2024, 8, 10),
                     updatedDate=datetime(2024, 8, 15)),

            Products(name='Thắt lưng da', price=199000, description='Thắt lưng da sang trọng',
                     imageProduct='leather-1.jpg', category_id=5, unitsInStock=60, discount=15,
                     createdDate=datetime(2024, 6, 1), updatedDate=datetime(2024, 8, 10)),
            Products(name='Kính mát thời trang', price=299000, description='Kính mát phong cách',
                     imageProduct='sunglasses-1.jpg', category_id=5, unitsInStock=70, discount=20,
                     createdDate=datetime(2024, 6, 15), updatedDate=datetime(2024, 8, 11)),
            Products(name='Mũ lưỡi trai', price=149000, description='Mũ lưỡi trai phong cách', imageProduct='cap-1.jpg',
                     category_id=5, unitsInStock=80, discount=10, createdDate=datetime(2024, 8, 15),
                     updatedDate=datetime(2024, 8, 16)),
            Products(name='Kính mát Leyean', price=299000, description='Kính mát phong cách thương hiệu Leyean',
                     imageProduct='sunglasses-2.jpg', category_id=5, unitsInStock=70, discount=20,
                     createdDate=datetime(2024, 6, 15), updatedDate=datetime(2024, 8, 11)),
            Products(name='Túi đeo thời trang Oupica', price=299000, description='Túi đem phong cách',
                     imageProduct='bag-1.png', category_id=5, unitsInStock=70, discount=20,
                     createdDate=datetime(2024, 6, 15), updatedDate=datetime(2024, 8, 11)),
            Products(name='Đồng hồ nam Pasika', price=299000, description='Đồng hồ nam màu đen thương hiệu Pasiko',
                     imageProduct='watch-1.jpg', category_id=5, unitsInStock=70, discount=20,
                     createdDate=datetime(2024, 6, 15), updatedDate=datetime(2024, 8, 11)),
            Products(name='Áo sơ mi caro', price=309000, description='Áo sơ mi caro lịch lãm',
                     imageProduct='shirt-10.jpg', category_id=1, unitsInStock=25, discount=10,
                     createdDate=datetime(2024, 1, 20), updatedDate=datetime(2024, 8, 18)),
            # Products(name='Áo khoác gió', price=659000, description='Áo khoác gió chống nước',
            #          imageProduct='windbreaker.jpg', category_id=3, unitsInStock=30, discount=5,
            #          createdDate=datetime(2024, 2, 5), updatedDate=datetime(2024, 8, 19)),
            # Products(name='Quần jogger', price=389000, description='Quần jogger thể thao thoải mái',
            #          imageProduct='joggers.jpg', category_id=2, unitsInStock=40, discount=15,
            #          createdDate=datetime(2024, 2, 15), updatedDate=datetime(2024, 8, 20)),
            # Products(name='Giày da', price=799000, description='Giày da chất liệu cao cấp',
            #          imageProduct='leather_shoes.jpg', category_id=4, unitsInStock=50, discount=10,
            #          createdDate=datetime(2024, 3, 1), updatedDate=datetime(2024, 8, 21)),
            # Products(name='Thắt lưng vải', price=149000, description='Thắt lưng vải tiện dụng',
            #          imageProduct='fabric_belt.jpg', category_id=5, unitsInStock=60, discount=5,
            #          createdDate=datetime(2024, 3, 10), updatedDate=datetime(2024, 8, 22)),
            #
            # Products(name='Áo sơ mi xanh nhạt', price=329000, description='Áo sơ mi xanh nhạt mềm mại',
            #          imageProduct='light_blue_shirt.jpg', category_id=1, unitsInStock=20, discount=10,
            #          createdDate=datetime(2024, 4, 1), updatedDate=datetime(2024, 8, 23)),
            # Products(name='Quần tây đen', price=439000, description='Quần tây đen thanh lịch',
            #          imageProduct='black_trousers.jpg', category_id=2, unitsInStock=30, discount=20,
            #          createdDate=datetime(2024, 4, 10), updatedDate=datetime(2024, 8, 24)),
            # Products(name='Áo khoác lông', price=999000, description='Áo khoác lông ấm áp cho mùa đông',
            #          imageProduct='fur_jacket.jpg', category_id=3, unitsInStock=15, discount=25,
            #          createdDate=datetime(2024, 5, 1), updatedDate=datetime(2024, 8, 25)),
            # Products(name='Giày lười da', price=749000, description='Giày lười da cao cấp',
            #          imageProduct='leather_loafers.jpg', category_id=4, unitsInStock=25, discount=10,
            #          createdDate=datetime(2024, 5, 15), updatedDate=datetime(2024, 8, 26)),
            # Products(name='Kính mát gương', price=349000, description='Kính mát gương thời trang',
            #          imageProduct='mirror_sunglasses.jpg', category_id=5, unitsInStock=50, discount=15,
            #          createdDate=datetime(2024, 6, 1), updatedDate=datetime(2024, 8, 27)),
            #
            # Products(name='Áo sơ mi ngắn tay', price=289000, description='Áo sơ mi ngắn tay mát mẻ',
            #          imageProduct='short_sleeve_shirt.jpg', category_id=1, unitsInStock=30, discount=20,
            #          createdDate=datetime(2024, 6, 10), updatedDate=datetime(2024, 8, 28)),
            # Products(name='Quần thể thao', price=379000, description='Quần thể thao đa năng',
            #          imageProduct='sports_pants.jpg', category_id=2, unitsInStock=50, discount=10,
            #          createdDate=datetime(2024, 6, 20), updatedDate=datetime(2024, 8, 29)),
            # Products(name='Áo khoác bông', price=869000, description='Áo khoác bông ấm áp cho mùa đông',
            #          imageProduct='puffer_jacket.jpg', category_id=3, unitsInStock=20, discount=15,
            #          createdDate=datetime(2024, 7, 1), updatedDate=datetime(2024, 8, 30)),
            # Products(name='Giày da lộn', price=899000, description='Giày da lộn thời trang',
            #          imageProduct='suede_shoes.jpg', category_id=4, unitsInStock=30, discount=5,
            #          createdDate=datetime(2024, 7, 10), updatedDate=datetime(2024, 8, 31)),
            # Products(name='Thắt lưng da bò', price=229000, description='Thắt lưng da bò cao cấp',
            #          imageProduct='cowhide_belt.jpg', category_id=5, unitsInStock=40, discount=10,
            #          createdDate=datetime(2024, 7, 20), updatedDate=datetime(2024, 9, 1)),
            # Products(name='Áo sơ mi trắng cổ đứng', price=309000, description='Áo sơ mi trắng cổ đứng lịch lãm',
            #          imageProduct='white_standing_collar_shirt.jpg', category_id=1, unitsInStock=25, discount=15,
            #          createdDate=datetime(2024, 8, 1), updatedDate=datetime(2024, 9, 2)),
            # Products(name='Áo khoác dạ', price=899000, description='Áo khoác dạ cho mùa đông',
            #          imageProduct='wool_coat.jpg', category_id=3, unitsInStock=15, discount=20,
            #          createdDate=datetime(2024, 8, 10), updatedDate=datetime(2024, 9, 3)),
            # Products(name='Quần kaki', price=399000, description='Quần kaki thoải mái', imageProduct='khaki_pants.jpg',
            #          category_id=2, unitsInStock=30, discount=15, createdDate=datetime(2024, 8, 15),
            #          updatedDate=datetime(2024, 9, 4)),
            # Products(name='Giày sneaker thể thao', price=899000, description='Giày sneaker thể thao cao cấp',
            #          imageProduct='sports_sneakers.jpg', category_id=4, unitsInStock=35, discount=10,
            #          createdDate=datetime(2024, 8, 20), updatedDate=datetime(2024, 9, 5)),
            # Products(name='Kính mát thời trang mới', price=399000, description='Kính mát thời trang mới nhất',
            #          imageProduct='new_fashion_sunglasses.jpg', category_id=5, unitsInStock=50, discount=20,
            #          createdDate=datetime(2024, 8, 25), updatedDate=datetime(2024, 9, 6)),
            # Products(name='Áo sơ mi đen', price=319000, description='Áo sơ mi đen cổ điển',
            #          imageProduct='black_shirt.jpg', category_id=1, unitsInStock=20, discount=10,
            #          createdDate=datetime(2024, 8, 30), updatedDate=datetime(2024, 9, 7)),
            # Products(name='Quần thể thao ngắn', price=359000, description='Quần thể thao ngắn thoải mái',
            #          imageProduct='short_sports_pants.jpg', category_id=2, unitsInStock=40, discount=10,
            #          createdDate=datetime(2024, 9, 1), updatedDate=datetime(2024, 9, 8)),
            # Products(name='Áo khoác bomber da', price=799000, description='Áo khoác bomber da chất lượng',
            #          imageProduct='leather_bomber_jacket.jpg', category_id=3, unitsInStock=25, discount=5,
            #          createdDate=datetime(2024, 9, 5), updatedDate=datetime(2024, 9, 9)),
            # Products(name='Giày lười bằng vải', price=699000, description='Giày lười bằng vải tiện dụng',
            #          imageProduct='fabric_loafers.jpg', category_id=4, unitsInStock=30, discount=10,
            #          createdDate=datetime(2024, 9, 10), updatedDate=datetime(2024, 9, 10)),
            # Products(name='Thắt lưng bằng vải dày', price=169000, description='Thắt lưng bằng vải dày dạn',
            #          imageProduct='thick_fabric_belt.jpg', category_id=5, unitsInStock=60, discount=5,
            #          createdDate=datetime(2024, 9, 15), updatedDate=datetime(2024, 9, 11)),
            # Products(name='Áo sơ mi trắng cổ trụ', price=299000, description='Áo sơ mi trắng cổ trụ thời trang',
            #          imageProduct='white_standing_collar_shirt_2.jpg', category_id=1, unitsInStock=25, discount=10,
            #          createdDate=datetime(2024, 9, 20), updatedDate=datetime(2024, 9, 12)),
            # Products(name='Quần skinny', price=399000, description='Quần skinny thời trang',
            #          imageProduct='skinny_pants.jpg', category_id=2, unitsInStock=30, discount=15,
            #          createdDate=datetime(2024, 9, 25), updatedDate=datetime(2024, 9, 13)),
            # Products(name='Áo khoác lông vũ', price=999000, description='Áo khoác lông vũ ấm áp cho mùa đông',
            #          imageProduct='down_jacket.jpg', category_id=3, unitsInStock=15, discount=20,
            #          createdDate=datetime(2024, 10, 1), updatedDate=datetime(2024, 9, 14)),
            # Products(name='Giày da công sở', price=849000, description='Giày da công sở lịch sự',
            #          imageProduct='office_leather_shoes.jpg', category_id=4, unitsInStock=25, discount=10,
            #          createdDate=datetime(2024, 10, 5), updatedDate=datetime(2024, 9, 15)),
            # Products(name='Kính mát thể thao', price=349000, description='Kính mát thể thao năng động',
            #          imageProduct='sporty_sunglasses.jpg', category_id=5, unitsInStock=60, discount=15,
            #          createdDate=datetime(2024, 10, 10), updatedDate=datetime(2024, 9, 16)),
            # Products(name='Áo sơ mi tím', price=329000, description='Áo sơ mi tím thanh lịch',
            #          imageProduct='purple_shirt.jpg', category_id=1, unitsInStock=30, discount=10,
            #          createdDate=datetime(2024, 10, 15), updatedDate=datetime(2024, 9, 17)),
            # Products(name='Quần khaki xanh', price=419000, description='Quần khaki xanh thoải mái',
            #          imageProduct='green_khaki_pants.jpg', category_id=2, unitsInStock=35, discount=20,
            #          createdDate=datetime(2024, 10, 20), updatedDate=datetime(2024, 9, 18)),
            # Products(name='Áo khoác dạ dài', price=1099000, description='Áo khoác dạ dài ấm áp cho mùa đông',
            #          imageProduct='long_wool_coat.jpg', category_id=3, unitsInStock=10, discount=25,
            #          createdDate=datetime(2024, 10, 25), updatedDate=datetime(2024, 9, 19)),
            # Products(name='Giày lười mùa đông', price=799000, description='Giày lười mùa đông ấm áp',
            #          imageProduct='winter_loafers.jpg', category_id=4, unitsInStock=20, discount=15,
            #          createdDate=datetime(2024, 10, 30), updatedDate=datetime(2024, 9, 20)),
            # Products(name='Kính mát phong cách cổ điển', price=399000, description='Kính mát phong cách cổ điển',
            #          imageProduct='classic_sunglasses.jpg', category_id=5, unitsInStock=50, discount=10,
            #          createdDate=datetime(2024, 11, 1), updatedDate=datetime(2024, 9, 21)),
            # Products(name='Áo sơ mi cổ điển', price=319000, description='Áo sơ mi cổ điển sang trọng',
            #          imageProduct='classic_shirt.jpg', category_id=1, unitsInStock=25, discount=5,
            #          createdDate=datetime(2024, 11, 5), updatedDate=datetime(2024, 9, 22)),
            # Products(name='Quần thể thao dài', price=389000, description='Quần thể thao dài thoải mái',
            #          imageProduct='long_sports_pants.jpg', category_id=2, unitsInStock=45, discount=10,
            #          createdDate=datetime(2024, 11, 10), updatedDate=datetime(2024, 9, 23)),
            # Products(name='Áo khoác ấm mùa đông', price=1099000, description='Áo khoác ấm mùa đông cực chất',
            #          imageProduct='winter_coat.jpg', category_id=3, unitsInStock=10, discount=20,
            #          createdDate=datetime(2024, 11, 15), updatedDate=datetime(2024, 9, 24)),
            # Products(name='Giày da mềm', price=799000, description='Giày da mềm cao cấp',
            #          imageProduct='soft_leather_shoes.jpg', category_id=4, unitsInStock=30, discount=10,
            #          createdDate=datetime(2024, 11, 20), updatedDate=datetime(2024, 9, 25)),
            # Products(name='Kính mát chống UV', price=449000, description='Kính mát chống UV bảo vệ mắt',
            #          imageProduct='uv_sunglasses.jpg', category_id=5, unitsInStock=40, discount=15,
            #          createdDate=datetime(2024, 11, 25), updatedDate=datetime(2024, 9, 26)),
            # Products(name='Áo sơ mi trắng xẻ cổ', price=329000, description='Áo sơ mi trắng xẻ cổ thời trang',
            #          imageProduct='white_shirt_v-neck.jpg', category_id=1, unitsInStock=20, discount=10,
            #          createdDate=datetime(2024, 12, 1), updatedDate=datetime(2024, 9, 27)),
            # Products(name='Quần jeans xanh', price=399000, description='Quần jeans xanh thời trang',
            #          imageProduct='blue_jeans.jpg', category_id=2, unitsInStock=30, discount=15,
            #          createdDate=datetime(2024, 12, 5), updatedDate=datetime(2024, 9, 28)),
            # Products(name='Áo khoác da mùa đông', price=1199000, description='Áo khoác da mùa đông cao cấp',
            #          imageProduct='winter_leather_jacket.jpg', category_id=3, unitsInStock=15, discount=20,
            #          createdDate=datetime(2024, 12, 10), updatedDate=datetime(2024, 9, 29)),
            # Products(name='Giày lười mùa hè', price=699000, description='Giày lười mùa hè thoải mái',
            #          imageProduct='summer_loafers.jpg', category_id=4, unitsInStock=25, discount=10,
            #          createdDate=datetime(2024, 12, 15), updatedDate=datetime(2024, 9, 30)),
            # Products(name='Kính mát thời trang mới', price=359000,
            #          description='Kính mát thời trang mới nhất cho mùa đông', imageProduct='winter_sunglasses.jpg',
            #          category_id=5, unitsInStock=55, discount=15, createdDate=datetime(2024, 12, 20),
            #          updatedDate=datetime(2024, 10, 1))
        ]
        db.session.add_all(products_data)
        db.session.commit()

        # account_data = [
        #     Accounts(name="Trần Văn Bình", email="tranvanb@example.com",
        #              username="admin",  password=str(hashlib.md5('123456'.encode('utf-8')).hexdigest()), user_id=1, users_role_id=UsersRole.ADMIN, active=True),
        #     Accounts(name="Lê Thu Cúc", email="lethic@example.com",
        #              username="nhanvien1",  password=str(hashlib.md5('123456'.encode('utf-8')).hexdigest()), user_id=3,users_role_id=UsersRole.EMPLOYEE, active=True),
        #     Accounts(name="Phạm Anh Dương", email="phamvand@example.com",
        #              username="nhanvien2",  password=str(hashlib.md5('123456'.encode('utf-8')).hexdigest()), user_id=4,users_role_id=UsersRole.EMPLOYEE, active=True),
        #     Accounts(name="Nguyễn Bùi An Ly", email="nguyenthie@example.com",
        #              username="kh1",  password=str(hashlib.md5('123456'.encode('utf-8')).hexdigest()), user_id=6,users_role_id=UsersRole.CUSTOMER, active=True),
        #     Accounts(name="Hoàng Văn Nam", email="hoangvanf@example.com",
        #              username="kh2",  password=str(hashlib.md5('123456'.encode('utf-8')).hexdigest()), user_id=7,users_role_id=UsersRole.CUSTOMER, active=True)
        # ]
        #
        # db.session.add_all(account_data)
        # db.session.commit()