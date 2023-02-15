from pymongo import MongoClient 
from bson.objectid import ObjectId

class Database:
    def __init__(self):
        self._client = MongoClient("mongodb+srv://archita:mongodb1234@cluster0.tlwbbmc.mongodb.net/test")  # configure db url
        self._db = self._client["Bus_Ticket_Booking_System"]  # configure db name

    def get_database(self):
        return self._db
    
    def create(self, table, object):
        inserted = self._db[table].insert_one(object)
        return inserted
    
    def read(self, table, filter):
        return self._db[table].find_one(filter)
    
    def read_all(self, table):
        cursor = self._db[table].find({})
        objects = [data for data in cursor]
        return objects
    
    def update(self, table, filter, set):
        updated = self._db[table].update_one(filter, set)
        return updated
    
    def delete(self, table, object_id):
        self._db[table].delete_one({"_id": ObjectId(object_id)})


# if __name__ == "__main__":     
#    # Get the database
#    x = Database()
#    dbname = x.get_database()
#    print(dbname)