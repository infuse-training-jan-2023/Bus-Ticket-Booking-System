from flask import Flask, Response, request
from DB.database import Database
from pymongo import MongoClient
import json
from models.user import User
from models.bus import Bus
from models.ticket import Ticket
from encoder import Encoder

app = Flask(__name__)
user = User()
bus = Bus()
ticket = Ticket()

@app.route('/', methods = ['GET'])
def welcome():
	return "Hello World"

# user login
@app.route('/login', methods = ['POST'])
def login():
    request_data = request.get_json()
    email = request_data['emailid']
    password = request_data['password']
    login_user = user.login(email,password)
    print(login_user)
    if login_user == {}:
        return Response({"Error": "Enter proper credentials"}, mimetype="application/json", status=400)
    json_data = Encoder().encode(login_user)
    return Response(json_data, mimetype="application/json", status=200)

# user registration
@app.route('/register', methods = ['POST'])
def register_user():
    request_data = request.get_json()
    new_user =  user.register(request_data)
    if new_user == {}:
        return Response({"Error": "Could not register user. Try again."}, mimetype="application/json", status=400)
    json_data = Encoder().encode(new_user)
    return Response(json_data, mimetype="application/json", status=200)

#search buses
@app.route('/bus_search', methods = ['POST'])
def filter_search():
    request_data = request.get_json()
    buses = bus.filter_search(request_data)
    if buses == {}:
        return Response({"Error": "No buses found for given data"}, mimetype="application/json", status=400)
    json_data = Encoder().encode(list(buses))
    return Response(json_data, mimetype="application/json", status=200)

#book ticket
@app.route('/ticket', methods = ['POST'])
def book_ticket():
    request_data = request.get_json()
    bus_id = request_data["bus_id"]
    user_id = request_data["user_id"]
    ticket_price = request_data["ticket_price"]
    date = request_data["date"]
    selected_seats = request_data["selected_seats"]
    day = request_data["day"]
    new_ticket = ticket.book_ticket(bus_id, user_id, ticket_price, date, selected_seats, day)
    if new_ticket == {}:
        return Response({"Error": "Could not book ticket"}, mimetype="application/json", status=400)
    json_data = Encoder().encode(new_ticket)
    return Response(json_data, mimetype="application/json", status=201)

#view ticket of users
@app.route('/ticket', methods = ['GET'])
def view_tickets_of_user():
    request_data = request.get_json()
    user_id = request_data["user_id"]
    tickets = ticket.view_tickets_of_user(user_id)
    if len(tickets) == 0:
        return Response({"Error": "No tickets available"}, mimetype="application/json", status=400)
    json_data = Encoder().encode(tickets)
    return Response(json_data, mimetype="application/json", status=201)

#cancel ticket
@app.route('/ticket', methods = ['PUT'])
def cancel_tickets():
    request_data = request.get_json()
    ticket_id = request_data["ticket_id"]
    date = request_data["date"]
    stat = ticket.cancel_tickets(ticket_id, date)
    if stat == {}:
        return Response({"Error": "Could not cancel ticket"}, mimetype="application/json", status=400)
    return Response(json.dumps(stat), mimetype="application/json", status=201)

#ADMIN
#view buses
@app.route('/buses', methods = ['GET'])
def find_all_buses():
    buses = bus.find_all_buses()
    if len(buses) == 0:
        return Response(json.dumps({"Error": "No buses found"}), mimetype="application/json", status=401)
    json_data = Encoder().encode(buses)
    return Response(json_data, mimetype="application/json", status=201)

# find a bus
@app.route('/bus', methods = ['GET'])
def find_a_bus():
    request_data = request.get_json()
    bus_id = request_data["bus_id"]
    get_bus = bus.find_a_bus(bus_id)
    if get_bus == {}:
        return Response({"Error": "Failed to find the bus"}, mimetype="application/json", status=404)
    json_data = Encoder().encode(get_bus)
    return Response(json_data, mimetype="application/json", status=200)

# delete bus
@app.route('/bus/<string:bus_id>', methods = ['DELETE'])
def delete_bus(bus_id):
    stat = bus.delete_bus(bus_id)
    if stat == {}:
        return Response({"Error": "Failed to delete the bus"}, mimetype="application/json", status=401)
    return Response(json.dumps(stat), mimetype="application/json", status=201)

# fetch all users
@app.route('/users', methods = ['GET'])
def fetch_users():
    users = user.fetch_users()
    if len(users) == 0:
        return Response({"Error": "Failed to fetch users"}, mimetype="application/json", status=404)
    data_json = Encoder().encode(list(users))
    return Response(data_json, mimetype="application/json", status=201)

# fetch a user
@app.route('/user', methods = ['GET'])
def fetch_user():
    request_data = request.get_json()
    emailid = request_data["emailid"]
    get_user = user.fetch_user(emailid)
    if get_user == {}:
        return Response({"Error": "Failed to fetch user"}, mimetype="application/json", status=404)
    data_json = Encoder().encode(get_user)
    return Response(data_json, mimetype="application/json", status=201)

if __name__ == '__main__':
    app.run(debug=True,host = '0.0.0.0',port = 4000)

