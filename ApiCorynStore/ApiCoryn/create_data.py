from ApiCoryn import app,db,user_datastore
from ApiCoryn.model import UsersRole,Users,Accounts,Products,Categories,Employees,Customers
from datetime import datetime
from flask_security.utils import hash_password
if __name__ == '__main__':
    with app.app_context():
        # db.drop_all()
        #db.create_all()
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
        #
        # db.session.add_all(users_data)
        # db.session.commit()
        #
        # # Employees
        # employees_data = [
        #     Employees(id=1),
        #     Employees(id=2),
        #     Employees(id=3),
        #     Employees(id=4),
        #     Employees(id=5)
        # ]
        # db.session.add_all(employees_data)
        # db.session.commit()
        #
        # # Customers
        # customers_data = [
        #     Customers(id=6),
        #     Customers(id=7),
        #     Customers(id=8),
        #     Customers(id=9),
        #     Customers(id=10)
        # ]
        # db.session.add_all(customers_data)
        # db.session.commit()
        #
        # # Categories
        # categories_data = [
        #     Categories(name='Áo sơ mi', photoCategory='category-shirt.png'),
        #     Categories(name='Quần jeans', photoCategory='category-jeans.jpg'),
        #     Categories(name='Áo khoác', photoCategory='category-gallery.jpg'),
        #     Categories(name='Giày thể thao', photoCategory='category-shoes.jpg'),
        #     Categories(name='Đồng hồ', photoCategory='category-watched.jpg'),
        #     Categories(name='Phụ kiện thời trang', photoCategory='category-other.jpg')
        # ]
        # db.session.add_all(categories_data)
        # db.session.commit()
        #
        # # Products
        # products_data = [
        #     Products(name='Áo sơ mi trắng', price=299000, description='Áo sơ mi trắng chất liệu cotton cao cấp',
        #              imageProduct='shirt-5.jpg', category_id=1, unitsInStock=50, discount=10,
        #              createdDate=datetime(2024, 1, 1), updatedDate=datetime(2024, 8, 1)),
        #     Products(name='Áo sơ mi xanh', price=319000, description='Áo sơ mi xanh dương nhẹ nhàng',
        #              imageProduct='shirt-3.jpg', category_id=1, unitsInStock=30, discount=5,
        #              createdDate=datetime(2024, 1, 10), updatedDate=datetime(2024, 8, 2)),
        #     Products(name='Áo sơ mi kẻ sọc', price=329000, description='Áo sơ mi kẻ sọc hiện đại',
        #              imageProduct='shirt-6.jpg', category_id=1, unitsInStock=20, discount=15,
        #              createdDate=datetime(2024, 2, 1), updatedDate=datetime(2024, 8, 3)),
        #     Products(name='Áo sơ mi họa tiết', price=339000, description='Áo sơ mi họa tiết đa dạng',
        #              imageProduct='shirt-7.jpg', category_id=1, unitsInStock=45, discount=15,
        #              createdDate=datetime(2024, 7, 1), updatedDate=datetime(2024, 8, 12)),
        #
        #     Products(name='Quần jeans xanh', price=399000, description='Quần jeans chất liệu denim bền bỉ',
        #              imageProduct='trousers-2.jpg', category_id=2, unitsInStock=40, discount=20,
        #              createdDate=datetime(2024, 3, 1), updatedDate=datetime(2024, 8, 4)),
        #     Products(name='Quần jeans đen', price=419000, description='Quần jeans đen thời trang',
        #              imageProduct='trousers-1.jpg', category_id=2, unitsInStock=35, discount=25,
        #              createdDate=datetime(2024, 3, 10), updatedDate=datetime(2024, 8, 5)),
        #     Products(name='Quần shorts', price=349000, description='Quần shorts mùa hè thoải mái',
        #              imageProduct='trousers-3.jpg', category_id=2, unitsInStock=50, discount=10,
        #              createdDate=datetime(2024, 7, 10), updatedDate=datetime(2024, 8, 13)),
        #
        #     Products(name='Áo khoác da', price=799000, description='Áo khoác da cao cấp cho mùa đông',
        #              imageProduct='shirt-8.jpg', category_id=3, unitsInStock=25, discount=30,
        #              createdDate=datetime(2024, 4, 1), updatedDate=datetime(2024, 8, 6)),
        #     Products(name='Áo khoác bomber', price=729000, description='Áo khoác bomber kiểu dáng trẻ trung',
        #              imageProduct='shirt-4.jpg', category_id=3, unitsInStock=30, discount=10,
        #              createdDate=datetime(2024, 4, 15), updatedDate=datetime(2024, 8, 7)),
        #     Products(name='Áo khoác denim', price=749000, description='Áo khoác denim trẻ trung',
        #              imageProduct='shirt-2.jpg', category_id=3, unitsInStock=20, discount=5,
        #              createdDate=datetime(2024, 8, 1), updatedDate=datetime(2024, 8, 14)),
        #     Products(name='Áo khoác hoodie', price=669000, description='Áo khoác hoodie ấm áp',
        #              imageProduct='shirt-9.jpg', category_id=3, unitsInStock=45, discount=15,
        #              createdDate=datetime(2024, 9, 1), updatedDate=datetime(2024, 8, 17)),
        #
        #     Products(name='Giày thể thao hồng', price=899000, description='Giày thể thao hồng năng động',
        #              imageProduct='shoes-8.png', category_id=4, unitsInStock=50, discount=5,
        #              createdDate=datetime(2024, 5, 1), updatedDate=datetime(2024, 8, 8)),
        #     Products(name='Giày thể thao đen', price=919000, description='Giày thể thao đen cá tính',
        #              imageProduct='shoes-6.jpg', category_id=4, unitsInStock=40, discount=10,
        #              createdDate=datetime(2024, 5, 10), updatedDate=datetime(2024, 8, 9)),
        #     Products(name='Giày lười', price=699000, description='Giày lười thanh lịch', imageProduct='shoes-1.png',
        #              category_id=4, unitsInStock=35, discount=20, createdDate=datetime(2024, 8, 10),
        #              updatedDate=datetime(2024, 8, 15)),
        #
        #     Products(name='Thắt lưng da', price=199000, description='Thắt lưng da sang trọng',
        #              imageProduct='leather-1.jpg', category_id=6, unitsInStock=60, discount=15,
        #              createdDate=datetime(2024, 6, 1), updatedDate=datetime(2024, 8, 10)),
        #     Products(name='Kính mát thời trang', price=299000, description='Kính mát phong cách',
        #              imageProduct='sunglasses-1.jpg', category_id=6, unitsInStock=70, discount=20,
        #              createdDate=datetime(2024, 6, 15), updatedDate=datetime(2024, 8, 11)),
        #     Products(name='Mũ lưỡi trai', price=149000, description='Mũ lưỡi trai phong cách', imageProduct='cap-1.jpg',
        #              category_id=6, unitsInStock=80, discount=10, createdDate=datetime(2024, 8, 15),
        #              updatedDate=datetime(2024, 8, 16)),
        #     Products(name='Kính mát Leyean', price=299000, description='Kính mát phong cách thương hiệu Leyean',
        #              imageProduct='sunglasses-2.jpg', category_id=6, unitsInStock=70, discount=20,
        #              createdDate=datetime(2024, 6, 15), updatedDate=datetime(2024, 8, 11)),
        #     Products(name='Túi đeo thời trang Oupica', price=299000, description='Túi đem phong cách',
        #              imageProduct='bag-1.png', category_id=6, unitsInStock=70, discount=20,
        #              createdDate=datetime(2024, 6, 15), updatedDate=datetime(2024, 8, 11)),
        #     Products(name='Đồng hồ nam Pasika', price=299000, description='Đồng hồ nam màu đen thương hiệu Pasiko',
        #              imageProduct='watch-1.jpg', category_id=5, unitsInStock=70, discount=20,
        #              createdDate=datetime(2024, 6, 15), updatedDate=datetime(2024, 8, 11)),
        #     Products(name='Áo sơ mi caro', price=309000, description='Áo sơ mi caro lịch lãm',
        #              imageProduct='shirt-10.jpg', category_id=1, unitsInStock=25, discount=10,
        #              createdDate=datetime(2024, 1, 20), updatedDate=datetime(2024, 8, 18)),
        # ]
        #
        # db.session.add_all(products_data)
        # db.session.commit()

        # Create roles if they don't exist
        user_datastore.find_or_create_role(name='admin', description='Administrator')
        user_datastore.find_or_create_role(name='employee', description='Employee')
        user_datastore.find_or_create_role(name='customer', description='Customer')
        db.session.commit()

        # Create users and assign roles
        user_datastore.create_user(
            name='John Doe',
            email='admin1@example.com',
            username='admin1',
            password=hash_password('123456'),
            active=True,
            user_id=1,
            roles=['admin']
        )

        user_datastore.create_user(
            name='Jane Doe',
            email='employee1@example.com',
            username='employee1',
            password=hash_password('123456'),
            active=True,
            user_id=2,
            roles=['employee']
        )

        user_datastore.create_user(
            name='Alice Smith',
            email='employee2@example.com',
            username='employee2',
            password=hash_password('123456'),
            active=True,
            user_id=3,
            roles=['employee']
        )

        user_datastore.create_user(
            name='Bob Johnson',
            email='customer1@example.com',
            username='customer1',
            password=hash_password('123456'),
            active=True,
            user_id=7,
            roles=['customer']
        )

        user_datastore.create_user(
            name='Charlie Brown',
            email='customer2@example.com',
            username='customer2',
            password=hash_password('123456'),
            active=True,
            user_id=8,
            roles=['customer']
        )

        db.session.commit()