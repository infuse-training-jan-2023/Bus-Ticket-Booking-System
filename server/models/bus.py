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
            return {'Message': 'Failed to find buses'}

    def find_a_bus(self, bus_id):
        try:
            return self.db.Bus.find_one({"_id": ObjectId(bus_id)})
        except Exception as e:
            return {'Message': 'Failed to find the bus'}

    # call the same function for search(src, dst, day)
    def filter_search(self, filters):
        try:
            buses = self.db.Bus.find(filters)
            res = []
            for bus in buses:
                x = {
                    "start_city": bus["start_city"],
                    "destination_city": bus["destination_city"],
                    "seat_price": bus["seat_price"]
                }
                for routine in bus["routine"]:
                    if routine["day"] == filters["routine.day"]:
                        x["arrival_time"] = routine["arrival_time"]
                        x["departure_time"] = routine["departure_time"]
                res.append(x)
            return res
        except Exception as e:
            return {'Message': 'Failed to apply filter'}

# if __name__ == "__main__":
    # x = Bus()
    # print(list(x.find_all_buses()))
    # print(x.find_a_bus("63e4af4b219ec66d45d9b2d"))
    # print(x.search_bus("goa", "delhi", "sunday"))
    # filter = {
    #     "start_city": "goa",
    #     "destination_city": "delhi",
    #     "routine.day": "sunday",
    #     "seat_price": {
    #         "$lte": 1500
    #     },
    #     "routine.arrival_time": {
    #         "$gte": 1800
    #     }
    # }
    # print(x.filter_search(filter))

    




