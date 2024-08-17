from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from urllib.parse import quote
from flask_cors import CORS
app=Flask(__name__)
CORS(app)
app.config["SECRET_KEY"]="hsfjrgfjwnfgwejkfnjwegnwj"
app.secret_key="sacfasfgwgwgwgwgwegehehehehru5hrt"
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:%s@localhost/db_coryn_store?charset=utf8mb4" % quote(
    "123456")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
db = SQLAlchemy(app=app)
ma = Marshmallow(app=app)
