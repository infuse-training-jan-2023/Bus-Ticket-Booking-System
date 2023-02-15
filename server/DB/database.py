from pymongo import MongoClient 
from bson.objectid import ObjectId

class Database:
    def __init__(self):
        self._client = MongoClient("mongodb+srv://archita:mongodb1234@cluster0.tlwbbmc.mongodb.net/test")  # configure db url
        self._db = self._client["Bus_Ticket_Booking_System"]  # configure db name

    def get_database(self):
        return self._db
    
    def create(self, table, object):
        return self._db[table].insert_one(object)
    
    def read(self, table, filter_object):
        return self._db[table].find_one(filter_object)
    
    def read_all(self, table, filter_object):
        return self._db[table].find(filter_object)
    
    def update(self, table, filter_object, set_object):
        return self._db[table].update_one(filter_object, set_object)
    
    def update_all(self, table, filter_object, set_object):
        return self._db[table].update_many(filter_object, set_object)
    
    def delete(self, table, object_id):
        self._db[table].delete_one({"_id": ObjectId(object_id)})


# if __name__ == "__main__":     
#    # Get the database
#    x = Database()
#    dbname = x.get_database()
#    print(dbname)