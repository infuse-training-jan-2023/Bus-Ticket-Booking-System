import requests

ticket = {
    "bus_id":"63e4b4c0219ec66d45de9b32",
    "user_id":"63e49ceca788d71cb4dae60c",
    "ticket_price":1800,
    "date":"2023-02-12",
    "selected_seats":["a1","a2"],
    "day":"wednsday"
}
def test_api_call_exists():
    response = requests.post('http://127.0.0.1:4000/ticket',json=ticket)
    assert response.status_code==201


def test_status_code():
    response = requests.post('http://127.0.0.1:4000/ticket',json=ticket)
    assert response.status_code==201

def test_response_for_valid_info():
    response = requests.post('http://127.0.0.1:4000/ticket',json=ticket)
    assert response.json()!={}


def test_response_for_invalid_credentials():
    ticket['day']='invalid'
    response = requests.post('http://127.0.0.1:4000/ticket',json=ticket)
    assert response.text=='Error'
