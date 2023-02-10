from DB.database import Database
from models import ticket
from bson.objectid import ObjectId

class Bus:
    def __init__(self)->None:
        self.db = Database().get_database()

    def delete_bus(self, bus_id):
        try:
            table = self.db.Bus
            table.delete_one({"_id": ObjectId(bus_id)})
            return {"Success": "Bus deleted successfully"}
        except:
            return {}

    def find_all_buses(self):
        try:
            cursor = self.db.Bus.find({})
            buses = [bus for bus in cursor]
            return buses
        except:
            return {}

    def find_a_bus(self, bus_id):
        try:
            bus = self.db.Bus.find_one({"_id": ObjectId(bus_id)})
            return bus
        except:
            return {}

    # call the same function for search(src, dst, day)
    def filter_search(self, filters):
        try:
            buses = self.db.Bus.find(filters)
            res = []
            for bus in buses:
                print(bus)
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
        except:
            return {}

    def add_selected_seats(self, bus_id, selected_seats, date, day):
        try:
            table = self.db.Bus
            table.update_one(
                {
                    "_id": ObjectId(bus_id),
                    "booked_seat.date_of_journey": date
                },
                {"$push": {
                    "booked_seat.$.seat_numbers": {"$each": selected_seats}
                    },
                },
            )
            bus_cursor = self.find_a_bus(bus_id)
            routines = bus_cursor["routine"]
            for routine in routines:
                if routine["day"] == day:
                    arrival_time = routine["arrival_time"]
                    departure_time = routine["departure_time"]
            return {
                "start_city": bus_cursor["start_city"],
                "destination_city": bus_cursor["destination_city"],
                "arrival_time": arrival_time,
                "departure_time": departure_time
            }
        except:
            return {}
    
    def remove_bus_seats(self,ticket_id,date):
        try:
            bus_collection=self.db.Bus
            cursor=ticket.Ticket().get_ticket(ticket_id)
            for item in cursor:
                cancelled_seats=item["selected_seats"]
                bus_id=str(item["bus_id"])
            bus_collection.update_many( 
                {
                    "_id": ObjectId(bus_id),
                    "booked_seat.date_of_journey": date
                },
                {"$pull":{
                    "booked_seat.$.seat_numbers": {"$in": cancelled_seats} 
                },
              },
            )
            return True
        except:
            return {}

# bus = Bus()
# bus.add_selected_seats("63e4b5ac219ec66d45de9b35", ['a2', 'a3'], "2023-02-12")


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