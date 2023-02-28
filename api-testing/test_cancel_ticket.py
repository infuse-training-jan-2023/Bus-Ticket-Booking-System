import requests
success_result = {"status":"cancel success"}
ticket_to_be_deleted ={
    'ticket_id':'63ec60ab90f8e77152af52e8',
    'date':'2023-02-18'
    }
class TestCancelTicket:
    def test_status_code(self):
        response = requests.put('http://127.0.0.1:4000/ticket',json=ticket_to_be_deleted)
        assert response.status_code==201

    def test_cancel_ticket_valid_ticket_id(self):
        response = requests.put('http://127.0.0.1:4000/ticket',json=ticket_to_be_deleted)
        assert response.text!="Error"

    # no matter what the field names are or the values it always responds with the status code 201
    def test_cancel_ticket_invalid_ticket_id(self):
        ticket_to_be_deleted['ticket_id']=3
        response = requests.put('http://127.0.0.1:4000/ticket',json=ticket_to_be_deleted)
        assert response.status_code==201
