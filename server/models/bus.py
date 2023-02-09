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
            return {'Message': 'Failed to find buses'}

    def find_a_bus(self, bus_id):
        try:
            return self.db.Bus.find_one({"_id": ObjectId(bus_id)})
        except Exception as e:
            print(e)
            return {'Message': 'Failed to find the bus'}

    def search_bus(self, src, dst, day):
        try:
            # return self.db.Bus.find({"start_city": src, "destination_city": dst, "routine": { "$elemMatch": {"day": day}}}, {"seat_price", "routine.arrival_time", "routine.departure_time"})
            return self.db.Bus.find({"start_city": src, "destination_city": dst, "routine.day": day}, {"seat_price": 1, "routine.arrival_time": 1, "routine.departure_time": 1})
        except Exception as e:
            print(e)
            return {'Message': 'Failed to search bus'}

    def filter_search(self, filters):
        try:
            return self.db.Bus.find(filters, {"seat_price": 1, "routine.arrival_time": 1, "routine.departure_time": 1})
        except Exception as e:
            print(e)
            return {'Message': 'Failed to apply filter'}

if __name__ == "__main__":
    x = Bus()
    # print(list(x.find_all_buses()))
    # print(x.find_a_bus("63e4af4b219ec66d45d9b2d"))
    print(list(x.search_bus("goa", "delhi", "sunday")))

    




