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
            return str(deleted_bus)
        except Exception as e :
            return e

    def fetch_bus(self,id):
        table = self.db.Bus
        bus = table.find_one({'_id':ObjectId(id)})
        return bus




