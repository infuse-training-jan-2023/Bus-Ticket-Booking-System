import requests

search = {
"start_city": "goa",
"destination_city":"delhi",
"day":"sunday"
}
class TestSearchBus:
    def test_status_code(self):
        response = requests.post('http://127.0.0.1:4000/bus_search',json=search)
        assert response.status_code==200

    def test_response_for_valid_search_query(self):
        response = requests.post('http://127.0.0.1:4000/bus_search',json=search)
        assert response.text!="Error"

    def test_response_for_invalid_search_query(self):
        search['start_city']='invalid'
        response = requests.post('http://127.0.0.1:4000/bus_search',json=search)
        assert response.json()==[]

