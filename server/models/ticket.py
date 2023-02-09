import sys
sys.path.append("../")
from DB.database import Database

class Ticket():
    def __init__(self):
        self.db = Database().get_database()

    def book_ticket(self, bus_id, user_id, date, ticket_price, selected_seats):
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
            return {
                "ticket_id": cursor.inserted_id,
                "bus_id": bus_id,
                "user_id": user_id,
                "date": date,
                "ticket_price": ticket_price,
                "selected_seats": selected_seats,
                "status": True
            }
        except Exception as e:
            return {"Error": e}

ticket = Ticket()
bus_id = "63e4af4b219ec66d45de9b2d"
user_id = "63e49ceca788d71cb4dae60c"
date = "2023-02-18"
ticket_price = 2600
selected_seats = ["5A", "5B"]

newticket = ticket.book_ticket(bus_id, user_id, date, ticket_price, selected_seats)
print(newticket)