import requests

ticket = {
    "bus_id":"63eb80dc937afcbf2cbe0b7f",
    "user_id":"63e4ace5ebfd77dd9c2a8ae2",
    "ticket_price":1800,
    "date":"2023-02-18",
    "selected_seats":["s1","s2"],
    "day":"sunday"
}

class TestBookTicket:
    def test_status_code(self):
        response = requests.post('http://127.0.0.1:4000/ticket',json=ticket)
        assert response.status_code==201

    def test_response_for_valid_ticket_info(self):
        response = requests.post('http://127.0.0.1:4000/ticket',json=ticket)
        assert response.text!="Error"


    def test_response_for_invalid_ticket_info(self):
        ticket['day']='invalid'
        response = requests.post('http://127.0.0.1:4000/ticket',json=ticket)
        assert response.text=='Error'
