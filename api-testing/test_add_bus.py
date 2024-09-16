import requests

bus = {
    "bus_type":"ac",
    "start_city":"goa",
    "destination_city":"bangalore",
    "routine":[{"day":"sunday","arrival_time":1800,"departure_time":1900}],
    "seat_price":1300,
    "booked_seat":[{"seat_numbers":["a2","b3"],"date_of_journey":"2023-02-26",}]
}

class TestBookTicket:
    def test_status_code(self):
        response = requests.post('http://127.0.0.1:4000/bus',json=bus)
        assert response.status_code==201

    def test_for_valid_bus_object(self):
        response = requests.post('http://127.0.0.1:4000/bus',json=bus)
        assert response.text!="Error"

