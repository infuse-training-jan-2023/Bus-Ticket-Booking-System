from flask import Flask,Response,request
from flask_cors import CORS
import sys
sys.path.append('../')
from DB.database import Database
from pymongo import MongoClient
import json
from models.user import User
from models.bus import Bus


app = Flask(__name__)
cors = CORS(app, resources={"": {"origins": "*"}})
CORS(app)


# user login
user = User()
@app.route('/login', methods=['POST'])
def verify_login():
    json_data = request.json
    email = json_data['email']
    password = json_data['password']
    return user.login(email,password)

# user registration
@app.route('/register', methods=['POST'])
def register_user():
    json_data = request.json
    print(json_data)
    return user.register(json_data)


bus = Bus()
# delete bus
@app.route('/bus/delete/<id>', methods=['GET'])
def delete_bus(id):
    return bus.delete_bus(str(id))


if __name__ == '__main__':
    app.run(debug=True,host = '127.0.0.1',port = 4000)

