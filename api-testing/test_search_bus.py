import requests

search = {
"start_city": "goa",
"destination_city":"delhi",
"day":"sunday"
}
def test_api_call_exists():
    response = requests.post('http://127.0.0.1:4000/bus_search',json=search)
    assert response.status_code==200

def test_status_code():
    response = requests.post('http://127.0.0.1:4000/bus_search',json=search)
    assert response.status_code==200

def test_response_for_valid_search():
    response = requests.post('http://127.0.0.1:4000/bus_search',json=search)
    assert response.json()==[]

def test_response_for_invalid_search():
    response = requests.post('http://127.0.0.1:4000/bus_search',json={})
    assert response.text=='Error'

