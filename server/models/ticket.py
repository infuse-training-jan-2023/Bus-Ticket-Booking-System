import sys
sys.path.append("../")
from bson.objectid import ObjectId

from DB.database import Database

class Ticket:
    def __init__(self) -> None:
        self.db = Database().get_database()

    def view_ticket_of_user(self,id):
        try:
            ticket_collection=self.db.Ticket
            cursor=ticket_collection.find({"user_id":id})
            return cursor
        except Exception as e:
            return {}

    def get_ticket(self,ticket_id):
        try:
            ticket_collection=self.db.Ticket
            cursor=ticket_collection.find({"_id": ObjectId(ticket_id)})
            return cursor
        except Exception as e:
            print(e)

    def get_bus(self,bus_id):
        try:
            bus_collection=self.db.Bus
            cursor=bus_collection.find({"_id": ObjectId(bus_id)})
            return cursor
        except Exception as e:
            print(e)

    def view_all_tickets(self):
        try:
            ticket_collection=self.db.Ticket
            # cursor = ticket.find({"user_id":"63e49ceca788d71cb4dae60c"})
            for ticket in ticket_collection.find():
                    print(ticket["selected_seats"])
        except Exception as e:
            return {}

    def update_bus_seats(self,ticket_id,date):
        try:
            bus_collection=self.db.Bus
            cursor=self.get_ticket(ticket_id)
            for item in cursor:
                cancelled_seats=item["selected_seats"]
                bus_id=str(item["bus_id"])
            conditions=cancelled_seats
            print(cancelled_seats)
            bus_collection.update_many( 
                {
                    "_id": ObjectId(bus_id),
                    "booked_seat.date_of_journey": date
                },
                {"$pull":{
                    "booked_seat.$.seat_numbers": {"$in": cancelled_seats} 
                },
              },
            )
            return True
        except Exception as e:
            False

    def cancel_tickets(self,ticket_id,date):
        try:
            ticket_collection=self.db.Ticket
            ticket_collection.update_one(
                #{"$and":[{"user_id" : id},{"date":date}]},
                {"_id": ObjectId(ticket_id)},
                {"$set": { "status" : False}}
            )
            self.update_bus_seats(ticket_id,date)
            return {"status":"cancel success"}
        except Exception as e:
            return {"Error" :e}
    


ticket= Ticket()
# cursor=ticket.view_ticket_of_user("63e49ceca788d71cb4dae60c")
# for item in cursor:
#     print(item["date"])
#ticket.view_all_tickets()

ticket.cancel_tickets("63e4c194219ec66d45de9b4e","2023-02-11")



