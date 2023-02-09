import sys
sys.path.append("../")

from DB.database import Database

class Ticket:
    def __init__(self) -> None:
        self.db = Database().get_database()

    def view_ticket_of_user(self,id):
        try:
            ticket_collection=self.db.Ticket
            return cursor = ticket_collection.find({"user_id":id})
        except Exception as e:
            return {}

    def view_all_tickets(self):
        try:
            ticket_collection=self.db.Ticket
            # cursor = ticket.find({"user_id":"63e49ceca788d71cb4dae60c"})
            for ticket in ticket_collection.find():
                    print(ticket)
        except Exception as e:
            return {}

    # def cancel_tickets(self,tickets_array):
        


ticket= Ticket()
cursor=ticket.view_ticket_of_user("63e49ceca788d71cb4dae60c")
for item in cursor:
    print(item["date"])
#ticket.view_all_tickets()

