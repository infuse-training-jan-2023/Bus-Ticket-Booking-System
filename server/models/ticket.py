from bson.objectid import ObjectId
from DB.database import Database
from models import bus

class Ticket():
    def __init__(self):
        self.db = Database().get_database()

    def book_ticket(self, bus_id, user_id, ticket_price, date, selected_seats, day):
        try:
            table = self.db.Ticket
            cursor = table.insert_one({
                "bus_id": bus_id,
                "user_id": user_id,
                "date": date,
                "ticket_price": ticket_price,
                "selected_seats": selected_seats,
                "status": True
            })
            bus_data = bus.Bus().add_selected_seats(bus_id, selected_seats, date, day)
            return {
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
            return {}

    def view_tickets_of_user(self,id):
        try:
            ticket_collection=self.db.Ticket
            cursor=ticket_collection.find({"user_id":id})
            tickets = [ticket for ticket in cursor]
            return tickets
        except Exception as e:
            return {"Error": e}

    def get_ticket(self,ticket_id):
        try:
            ticket=self.db.Ticket.find({"_id": ObjectId(ticket_id)})
            return ticket
        except Exception as e:
            return {"Error": e}

    def get_bus(self,bus_id):
        try:
            bus_collection=self.db.Bus
            cursor=bus_collection.find({"_id": ObjectId(bus_id)})
            return cursor
        except Exception as e:
            return {"Error": e}

    def view_all_tickets(self):
        try:
            ticket_collection=self.db.Ticket
            for ticket in ticket_collection.find():
                    print(ticket["selected_seats"])
        except Exception as e:
            return {"Error": e}

    def cancel_tickets(self,ticket_id,date):
        try:
            self.db.Ticket.update_one(
                {"_id": ObjectId(ticket_id)},
                {"$set": { "status" : False}}
            )
            bus.Bus().remove_bus_seats(ticket_id,date)
            return {"status":"cancel success"}
        except:
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