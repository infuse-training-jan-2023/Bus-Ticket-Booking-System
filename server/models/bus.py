from DB.database import Database
from models import ticket
from bson.objectid import ObjectId

class Bus:
    def __init__(self)->None:
        self.db = Database().get_database()

    def delete_bus(self, bus_id):
        try:
            self.db.Bus.delete_one({"_id": ObjectId(bus_id)})
            return {"Success": "Bus deleted successfully"}
        except Exception as e:
            print(e)
            return {}

    def find_user_buses(self, bus_id, day):
        try:
            buses = self.db.Bus.find({
                "_id": ObjectId(bus_id),
                "routine.day": day
            })
            res = []
            for bus in buses:
                x = {
                    "id": str(bus["_id"]),
                    "start_city": bus["start_city"],
                    "destination_city": bus["destination_city"],
                    "seat_price": bus["seat_price"]
                }
                for routine in bus["routine"]:
                    if routine["day"] == day:
                        x["arrival_time"] = routine["arrival_time"]
                        x["departure_time"] = routine["departure_time"]
                res.append(x)
            return res
        except Exception as e:
            print(e)
            return {}

    def find_all_buses(self):
        try:
            cursor = self.db.Bus.find({})
            buses = [bus for bus in cursor]
            return buses
        except Exception as e:
            print(e)
            return {}

    def find_a_bus(self, bus_id):
        try:
            bus = self.db.Bus.find_one({"_id": ObjectId(bus_id)})
            return bus
        except Exception as e:
            print(e)
            return {}

    # call the same function for search(src, dst, day)
    def filter_search(self, filters):
        try:
            buses = self.db.Bus.find(filters)
            res = []
            for bus in buses:
                x = {
                    "id": str(bus["_id"]),
                    "start_city": bus["start_city"],
                    "destination_city": bus["destination_city"],
                    "seat_price": bus["seat_price"]
                }
                if "routine.day" in filters:
                    for routine in bus["routine"]:
                        if routine["day"] == filters["routine.day"]:
                            x["arrival_time"] = routine["arrival_time"]
                            x["departure_time"] = routine["departure_time"]
                res.append(x)
            return res
        except Exception as e:
            print(e)
            return {}

    def add_selected_seats(self, bus_id, selected_seats, date, day):
        try:
            result = self.db.Bus.update_one(
                {
                    "_id": ObjectId(bus_id),
                    "booked_seat.date_of_journey": date
                },
                {"$push": {
                    "booked_seat.$.seat_numbers": {"$each": selected_seats}
                    },
                },
            )
            if result.modified_count == 0:
                booked_seat = {
                    "seat_numbers": selected_seats,
                    "date_of_journey": date
                }
                self.db.Bus.update_one(
                    {
                        "_id": ObjectId(bus_id)
                    },
                    {"$push": {
                        "booked_seat": booked_seat
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
        except Exception as e:
            print(e)
            return {}
    
    def remove_bus_seats(self,ticket_id,date):
        try:
            ticket_object = ticket.Ticket()
            cursor = ticket_object.get_ticket(ticket_id)
            for item in cursor:
                cancelled_seats=item["selected_seats"]
                bus_id=str(item["bus_id"])
            self.db.Bus.update_many( 
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
        except Exception as e:
            print(e)
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