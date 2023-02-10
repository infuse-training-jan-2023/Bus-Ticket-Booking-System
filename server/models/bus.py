import sys
sys.path.append("../")
from DB.database import Database
from bson.objectid import ObjectId


class Bus:
    def __init__(self)  -> None:
        self.db = Database().get_database()

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
        except Exception as e:
            print(e)

bus = Bus()
bus.add_selected_seats("63e4b5ac219ec66d45de9b35", ['a2', 'a3'], "2023-02-12")