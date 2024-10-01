from flask_socketio import SocketIO

from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from google_auth_oauthlib.flow import Flow
import os, pathlib
from vnpay import Vnpay

app = Flask(__name__)

# Cấu hình CORS
CORS(app,  supports_credentials=True)
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
app.config["SECRET_KEY"] = "sacfasfgwgwgwgwgwegehehehehru5hrt"
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:123456@localhost/db_coryn_store?charset=utf8mb4"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
UPLOAD_FOLDER = 'public/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
jwt = JWTManager(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)
socketio = SocketIO(app, cors_allowed_origins="*")
client_secrets_file = os.path.join(pathlib.Path(__file__).parent.parent, "oauth_config.json")
flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email",
            "openid"],
    redirect_uri='http://localhost:5001/callback'
)



VNP_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
VNP_TMN_CODE = "1DY0DXEN"
VNP_HASH_SECRET = "FE02HKE27OPWPTSKYCD4WQ63QD9P68OD"
VNP_API = "https://sandbox.vnpayment.vn/"
