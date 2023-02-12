import requests

ticket = {
    "bus_id":"63e4b4c0219ec66d45de9b32",
    "user_id":"63e49ceca788d71cb4dae60c",
    "ticket_price":1800,
    "date":"2023-02-12",
    "selected_seats":["a1","a2"],
    "day":"wednsday"
}
class TestBookTicket:
    def test_status_code(self):
        response = requests.post('http://127.0.0.1:4000/ticket',json=ticket)
        assert response.status_code==201

    def test_response_for_valid_info(self):
        response = requests.post('http://127.0.0.1:4000/ticket',json=ticket)
        assert response.text!="Error"


    def test_response_for_invalid_credentials(self):
        ticket['day']='invalid'
        response = requests.post('http://127.0.0.1:4000/ticket',json=ticket)
        assert response.text=='Error'
