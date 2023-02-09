import sys
sys.path.append('../')
from DB.database import Database
from bson.objectid import ObjectId

class Bus:
    def __init__(self)->None:
        self.db = Database().get_database()

    def find_all_buses(self):
        try:
            return self.db.Bus.find({})
        except Exception as e:
            print(e)
            return {}

    def find_a_bus(self, bus_id):
        try:
            return self.db.Bus.find_one({"_id": ObjectId(bus_id)})
        except Exception as e:
            print(e)
            return {}

    def search_bus(self, src, dst, day):
        try:
            # return self.db.Bus.find({"start_city": src, "destination_city": dst, "routine": { "$elemMatch": {"day": day}}})
            return self.db.Bus.find({"start_city": src, "destination_city": dst, "routine.day": day}, {"seat_price", "routine.arrival_time", "routine.departure_time" })
        except Exception as e:
            print(e)
            return {}

if __name__ == "__main__":
    x = Bus()
    # print(list(x.find_all_buses()))
    # print(x.find_a_bus("63e4af4b219ec66d45d9b2d"))
    print(list(x.search_bus("goa", "delhi", "friday")))

    




