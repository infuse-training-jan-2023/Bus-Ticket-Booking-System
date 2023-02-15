from flask import Flask, Response, request
from DB.database import Database
from pymongo import MongoClient
import json
from models.user import User
from models.bus import Bus
from models.ticket import Ticket
from encoder import Encoder
from flask_cors import CORS
from controllers.user.user import user_controller
from controllers.ticket.ticket import ticket_controller
from controllers.bus.bus import bus_controller

app = Flask(__name__)
CORS(app)
user = User()
bus = Bus()
ticket = Ticket()

@app.route('/', methods = ['GET'])
def welcome():
	return "Hello World"

app.register_blueprint(user_controller)
app.register_blueprint(ticket_controller)
app.register_blueprint(bus_controller)

if __name__ == '__main__':
    app.run(debug=True,host = '0.0.0.0',port = 4000)

