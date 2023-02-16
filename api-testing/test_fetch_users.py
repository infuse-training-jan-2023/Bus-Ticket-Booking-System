import requests

class TestFetchUsers:
    def test_status_code(self):
        response = requests.get('http://127.0.0.1:4000/users')
        assert response.status_code==201


    def test_fetch_all_users(self):
        response = requests.get('http://127.0.0.1:4000/users')
        assert response.text!="Error"

