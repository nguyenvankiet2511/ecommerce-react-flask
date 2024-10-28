import paypalrestsdk
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

paypalrestsdk.configure({
    "mode": "sandbox",
    "client_id": "AffK2pwjqrzQUJQNTQ29uHMykflsYB4EHi4mons04-yauzIUHKUWp0gO6__58rfZwwtCC5sfvwsGj3Ga",
    "client_secret": "EITnSGG0p9X79_X1ms492us83sCrQMlNYYm7PkBcfIsniR5YvVTdXGfG_6MzA5cOVV59LJApOEZxU_bc"
})


