from pymongo import MongoClient 

class Database:
    def __init__(self):
        self._client = MongoClient("mongodb+srv://archita:mongodb1234@cluster0.tlwbbmc.mongodb.net/test")  # configure db url
        self._db = self._client["Bus_Ticket_Booking_System"]  # configure db name

    def get_database(self):
        # return self._db.list_collection_names()
        return self._db

# if __name__ == "__main__":     
#    # Get the database
#    x = Database()
#    dbname = x.get_database()
#    print(dbname)