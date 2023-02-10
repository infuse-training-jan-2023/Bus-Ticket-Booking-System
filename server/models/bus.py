from DB.database import Database
from bson import ObjectId


class Bus:
    def __init__(self):
        self.db = Database().get_database()

    def delete_bus(self,id):
        try:
            table = self.db.Bus
            deleted_bus = self.fetch_bus(id)
            print(deleted_bus)
            table.delete_one({"_id":ObjectId(id)})
            num_of_update_tickets = self.cancel_tickets_for_bus(id)
            return str(deleted_bus)
        except Exception as e :
            return e

    def fetch_bus(self,id):
        table = self.db.Bus
        bus = table.find_one({'_id':ObjectId(id)})
        return bus


    def cancel_tickets_for_bus(self,id):
        table = self.db.Ticket
        query = {'bus_id':str(id)}
        new_value = { "$set": { "status": False } }
        tickets = table.update_many(query,new_value)
        return str(tickets.modified_count)+ " documents updated."






