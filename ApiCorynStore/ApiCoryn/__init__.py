from flask import Flask
from ApiCoryn.model import db
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_security import Security, SQLAlchemyUserDatastore
from flask_cors import CORS
from urllib.parse import quote

# Khởi tạo ứng dụng Flask
app = Flask(__name__)
CORS(app)

# Cấu hình ứng dụng
app.config["SECRET_KEY"] = "your_secret_key_here"
app.config['SECURITY_PASSWORD_SALT'] = 'a-random-salt'
app.config['SECURITY_PASSWORD_HASH'] = 'argon2'
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://root:{quote('123456')}@localhost/db_coryn_store?charset=utf8mb4"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Khởi tạo các đối tượng
db.init_app(app)
ma = Marshmallow(app)

# Import mô hình sau khi khởi tạo db để tránh vòng lặp nhập khẩu
from ApiCoryn.model import Accounts, UsersRole

# Khởi tạo Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, Accounts, UsersRole)
security = Security(app, user_datastore)


