from flask import Blueprint, Response, request
from models.ticket import Ticket
from encoder import Encoder
import json
part_ticket = Blueprint('part_ticket', __name__)

ticket = Ticket()

#view a ticket
@part_ticket.route('/payment_success/<string:ticket_id>', methods = ['GET'])
def view_ticket(ticket_id):
    tickets = ticket.get_ticket(ticket_id)
    if tickets == {}:
        return Response({"Error": "No tickets available"}, mimetype="application/json", status=400)
    json_data = Encoder().encode(tickets)
    return Response(json_data, mimetype="application/json", status=201)

#book ticket
@part_ticket.route('/ticket', methods = ['POST'])
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
@part_ticket.route('/ticket/<string:user_id>', methods = ['GET'])
def view_tickets_of_user(user_id):
    # request_data = request.get_json()
    # user_id = request_data["user_id"]
    tickets = ticket.view_tickets_of_user(user_id)
    if len(tickets) == 0:
        return Response({"Error": "No tickets available"}, mimetype="application/json", status=400)
    json_data = Encoder().encode(tickets)
    return Response(json_data, mimetype="application/json", status=201)

#cancel ticket
@part_ticket.route('/ticket', methods = ['PUT'])
def cancel_tickets():
    request_data = request.get_json()
    ticket_id = request_data["ticket_id"]
    date = request_data["date"]
    stat = ticket.cancel_tickets(ticket_id, date)
    if stat == {}:
        return Response({"Error": "Could not cancel ticket"}, mimetype="application/json", status=201)
    return Response(json.dumps(stat), mimetype="application/json", status=201)