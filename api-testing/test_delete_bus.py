import requests

bus_id = '63e4b4c0219ec66d45de9b32'

class TestDeleteBus:
    def test_status_code(self):
        response = requests.delete('http://127.0.0.1:4000/bus/{}'.format(bus_id))
        assert response.status_code==201


    def test_get_bus_valid_id(self):
        response = requests.delete('http://127.0.0.1:4000/bus/{}'.format(bus_id))
        assert response.text!="Error"

    def test_get_bus_invalid_id(self):
        bus_id = 'invalid'
        response = requests.delete('http://127.0.0.1:4000/bus/{}'.format(bus_id))
        assert response.text=='Error'
