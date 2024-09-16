import requests




class TestFindBuses:
    def test_status_code(self):
        response = requests.get('http://127.0.0.1:4000/buses')
        assert response.status_code==201

    def test_get_all_buses(self):
        response = requests.get('http://127.0.0.1:4000/buses')
        assert response.text!="Error"

