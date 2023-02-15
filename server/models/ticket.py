from bson.objectid import ObjectId
from DB.database import Database
from models import bus

class Ticket():
    def __init__(self):
        self.db = Database()
        self.table_name = 'Ticket'

    def view_tickets_of_user(self, user_id):
        try:
            cursor=self.db.get_database().Ticket.find({"user_id":user_id})
            tickets = [ticket for ticket in cursor]
            return tickets
        except Exception as e:
            print(e)
            return {}

    def get_ticket(self, ticket_id):
        try:
            # ticket=self.db.get_database().Ticket.find({"_id": ObjectId(ticket_id)})
            ticket = self.db.read(self.table_name, {"_id": ObjectId(ticket_id)})
            return ticket
        except Exception as e:
            print(e)
            return {}

    def book_ticket(self, bus_id, user_id, ticket_price, date, selected_seats, day):
        try:
            # table = self.db.get_database().Ticket
            # cursor = table.insert_one({
            #     "bus_id": bus_id,
            #     "user_id": user_id,
            #     "date": date,
            #     "ticket_price": ticket_price,
            #     "selected_seats": selected_seats,
            #     "status": True
            # })
            new_ticket = {
                "bus_id": bus_id,
                "user_id": user_id,
                "date": date,
                "ticket_price": ticket_price,
                "selected_seats": selected_seats,
                "status": True
            }
            cursor = self.db.create(self.table_name, new_ticket)
            bus_object = bus.Bus()
            bus_data = bus_object.add_selected_seats(bus_id, selected_seats, date, day)
            return {
                # cannot mock inserted_id so in the test it raises exception since the return object of add_selected_seats
                # is dict and not a cursor specified in the mock test
                "ticket_id": cursor.inserted_id,
                "bus_id": bus_id,
                "user_id": user_id,
                "date": date,
                "start_city": bus_data["start_city"],
                "destination_city": bus_data["destination_city"],
                "arrival_time": bus_data["arrival_time"],
                "departure_time": bus_data["departure_time"],
                "ticket_price": ticket_price,
                "selected_seats": selected_seats,
                "status": True
            }
        except Exception as e:
            print(e)
            return {}

    def cancel_tickets(self,ticket_id,date):
        try:
            # self.db.get_database().Ticket.update_one(
            #     {"_id": ObjectId(ticket_id)},
            #     {"$set": { "status" : False}}
            # )
            self.db.update(self.table_name, {"_id": ObjectId(ticket_id)}, {"$set": { "status" : False}})
            bus_object = bus.Bus()
            bus_object.remove_bus_seats(ticket_id,date)
            return {"Status":"Ticket cancelled successfully"}
        except Exception as e:
            print(e)
            return {}



# ticket= Ticket()
# cursor=ticket.view_ticket_of_user("63e49ceca788d71cb4dae60c")
# for item in cursor:
#     print(item["date"])
#ticket.view_all_tickets()

# bus_id = "63e4af4b219ec66d45de9b2d"
# user_id = "63e49ceca788d71cb4dae60c"
# date = "2023-02-18"
# ticket_price = 2600
# selected_seats = ["5A", "5B"]
# ticket.cancel_tickets("63e4c194219ec66d45de9b4e","2023-02-11")

# newticket = ticket.book_ticket(bus_id, user_id, date, ticket_price, selected_seats)
# print(newticket)
