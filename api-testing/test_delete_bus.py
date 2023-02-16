import requests

bus_id = '63eb86f6937afcbf2cbe0b89'

class TestDeleteBus:
    def test_status_code(self):
        response = requests.delete('http://127.0.0.1:4000/bus/{}'.format(bus_id))
        assert response.status_code==201


    def test_delete_bus_valid_id(self):
        response = requests.delete('http://127.0.0.1:4000/bus/{}'.format(bus_id))
        print(response.json())
        assert response.text!="Error"

    def test_delete_bus_invalid_id(self):
        bus_id = 'invalid'
        response = requests.delete('http://127.0.0.1:4000/bus/{}'.format(bus_id))
        print(response.text)
        assert response.text=='Error'
