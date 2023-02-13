from flask import Blueprint, Response, request
from models.user import User
from encoder import Encoder
import json
part_user = Blueprint('part_user', __name__)

user = User()

# user login
@part_user.route('/login', methods = ['GET'])
def login():
    request_data = request.get_json()
    email = request_data['emailid']
    password = request_data['password']
    login_user = user.login(email,password)
    if login_user == {}:
        return Response(json.dumps({"Error": "Enter proper credentials"}), mimetype="application/json", status=400)
    json_data = Encoder().encode(login_user)
    return Response(json_data, mimetype="application/json", status=200)

# user registration
@part_user.route('/register', methods = ['POST'])
def register_user():
    request_data = request.get_json()
    new_user =  user.register(request_data)
    if new_user == {}:
        return Response(json.dumps({"Error": "Could not register user. Try again."}), mimetype="application/json", status=400)
    json_data = Encoder().encode(new_user)
    return Response(json_data, mimetype="application/json", status=501)

# fetch all users
@part_user.route('/users', methods = ['GET'])
def fetch_users():
    users = user.fetch_users()
    if len(users) == 0:
        return Response(json.dumps({"Error": "Failed to fetch users"}), mimetype="application/json", status=404)
    data_json = Encoder().encode(list(users))
    return Response(data_json, mimetype="application/json", status=201)

# fetch a user
@part_user.route('/user', methods = ['GET'])
def fetch_user():
    request_data = request.get_json()
    emailid = request_data["emailid"]
    get_user = user.fetch_user(emailid)
    if get_user == {}:
        return Response(json.dumps({"Error": "Failed to fetch user"}), mimetype="application/json", status=404)
    data_json = Encoder().encode(get_user)
    return Response(data_json, mimetype="application/json", status=201)