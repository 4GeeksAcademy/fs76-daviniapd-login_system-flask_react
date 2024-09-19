"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, session
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from sqlalchemy import or_

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
#Create a user with signup
@api.route('/signup', methods=['POST'])
def signup():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    
    # Verificar si se han proporcionado ambos campos
    if not email or not password or not username:
        return jsonify(message="Username, email and password are required"), 400
     
    # Verificar si la contraseña tiene una longitud mínima
    if len(password) < 8:
        return jsonify(message="Password must be at least 8 characters"), 400
    
    # Verificar si el correo electrónico ya existe
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify(message="Email already exists"), 400
    
    # Verificar si el username ya existe
    existing_username = User.query.filter_by(username=username).first()
    if existing_username:
        return jsonify(message="Username already exists"), 400
    
    new_user = User(username=username, email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=email)
    return jsonify({ "message": "User created","access_token": access_token}), 201


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=['POST'])
def login():
    identifier = request.json.get("identifier", None)
    password = request.json.get("password", None)
    user = User.query.filter(or_(User.email == identifier, User.username == identifier)).first()
    
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
    
    if user.password != password:
        return jsonify({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identity=user.email)
    return jsonify({"access_token": access_token}), 200

@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user, message="You are logged in and have access to the private route!"), 200

@api.route("/logout", methods=['POST'])
@jwt_required()
def logout():
    session.pop('jwt_token', None) 
    return jsonify({"msg": "Logged out successfully"}), 200

@api.route('/checkUser', methods=['POST'])
def check_user_exists():
    username = request.json.get('username')
    email = request.json.get('email')

    # Verificar si se han proporcionado al menos uno de los campos
    if not username and not email:
        return jsonify(message="Username or email is required"), 400

    # Verificar si el correo electrónico ya existe
    if email:
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify(exists=True, message="Email already exists"), 200

    # Verificar si el username ya existe
    if username:
        existing_username = User.query.filter_by(username=username).first()
        if existing_username:
            return jsonify(exists=True, message="Username already exists"), 200

    return jsonify(exists=False), 200