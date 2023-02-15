from flask import Blueprint, Response, request
from models.user import User
from encoder import Encoder
import json
user_controller = Blueprint('user_controller', __name__)

user = User()

# user login
@user_controller.route('/login', methods = ['GET'])
def login():
    request_data = request.get_json()
    email = request_data['emailid']
    password = request_data['password']
    login_user = user.login(email,password)
    if login_user == {}:
        return Response(json.dumps({"Error": "Incorrect credentials"}), mimetype="application/json", status=401)
    json_data = Encoder().encode(login_user)
    return Response(json_data, mimetype="application/json", status=200)

# user registration
@user_controller.route('/register', methods = ['POST'])
def register_user():
    request_data = request.get_json()
    new_user =  user.register(request_data)
    if new_user == {}:
        return Response(json.dumps({"Error": "Could not register user. Try again."}), mimetype="application/json", status=400)
    json_data = Encoder().encode(new_user)
    return Response(json_data, mimetype="application/json", status=201)

# fetch all users
@user_controller.route('/users', methods = ['GET'])
def fetch_users():
    users = user.fetch_users()
    if len(users) == 0:
        return Response(json.dumps({"Error": "Failed to fetch users"}), mimetype="application/json", status=400)
    data_json = Encoder().encode(list(users))
    return Response(data_json, mimetype="application/json", status=201)

# fetch a user
@user_controller.route('/user', methods = ['GET'])
def fetch_user():
    # request_data = request.get_json()
    # emailid = request_data["emailid"]
    emailid = request.args.get("emailid")
    print(emailid)
    get_user = user.fetch_user(emailid)
    if get_user == {}:
        return Response(json.dumps({"Error": "Failed to fetch user"}), mimetype="application/json", status=400)
    data_json = Encoder().encode(get_user)
    print(data_json)
    return Response(data_json, mimetype="application/json", status=201)
