import requests




bus_id={
    'bus_id':'63e4b4c0219ec66d45de9b32'
}
class TestFindBus:
    def test_status_code(self):
        response = requests.get('http://127.0.0.1:4000/bus',json=bus_id)
        assert response.status_code==200


    def test_get_bus_valid_id(self):
        response = requests.get('http://127.0.0.1:4000/bus',json=bus_id)
        assert response.text!="Error"

    def test_get_bus_invalid_id(self):
        bus_id['bus_id']='invalid'
        response = requests.get('http://127.0.0.1:4000/bus',json=bus_id)
        assert response.text=='Error'

