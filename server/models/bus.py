from server.DB.database import Database
from server.models import ticket
from bson.objectid import ObjectId

class Bus:
    def __init__(self)->None:
        self.db = Database()
        self.table_name = 'Bus'

    def delete_bus(self, bus_id):
        try:
            # self.db.get_database().Bus.delete_one({"_id": ObjectId(bus_id)})
            self.db.delete(self.table_name, ObjectId(bus_id))
            return {"Success": "Bus deleted successfully"}
        except Exception as e:
            print(e)
            return {}

    def find_user_buses(self, bus_id, day):
        try:
            buses = self.db.get_database().Bus.find({
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
            # cursor = self.db.get_database().Bus.find({})
            cursor = self.db.read_all(self.table_name, {})
            buses = [bus for bus in cursor]
            return buses
        except Exception as e:
            print(e)
            return {}

    def find_a_bus(self, bus_id):
        try:
            # bus = self.db.get_database().Bus.find_one({"_id": ObjectId(bus_id)})
            bus = self.db.read(self.table_name, {"_id": ObjectId(bus_id)})
            return bus
        except Exception as e:
            print(e)
            return {}

    # call the same function for search(src, dst, day)
    def filter_search(self, filters):
        try:
            buses = self.db.get_database().Bus.find(filters)
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
           
            bus_filter = {
                    "_id": ObjectId(bus_id),
                    "booked_seat.date_of_journey": date
                }
            seats_set = {"$push": {
                    "booked_seat.$.seat_numbers": {"$each": selected_seats}
                    },
                }
            result = self.db.update(self.table_name, bus_filter, seats_set)
            if result.modified_count == 0:
                booked_seat = {
                    "seat_numbers": selected_seats,
                    "date_of_journey": date
                }
                self.db.get_database().Bus.update_one(
                    {
                        "_id": ObjectId(bus_id)
                    },
                    {"$push": {
                        "booked_seat": booked_seat
                        },
                    },
                )
            bus_cursor = self.find_a_bus(bus_id)
            print(bus_cursor)
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
            cancelled_seats=cursor["selected_seats"]
            bus_id=str(cursor["bus_id"])
            self.db.get_database().Bus.update_many( 
                {
                    "_id": ObjectId(bus_id),
                    "booked_seat.date_of_journey": date
                },
                {"$pull":{
                    "booked_seat.$.seat_numbers": {"$in": cancelled_seats}
                },
              }
            )
            return True
        except Exception as e:
            print(e)
            return {}