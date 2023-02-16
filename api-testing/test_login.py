
import requests
valid_credentials = {
            "emailid": "omkarsavoikar@gmail.com",
            "password": "password"
        }
invalid_credentials={
    "emailid":"anything@gmail.com",
    "password":"anything"
}

class TestLogin:
    def test_status_code(self):
        response = requests.post('http://127.0.0.1:4000/login',json=valid_credentials)
        assert response.status_code==200

    def test_response_for_valid_credentials(self):
        response = requests.post('http://127.0.0.1:4000/login',json=valid_credentials)
        assert response.text!="Error"

    def test_response_for_invalid_credentials(self):
        response = requests.post('http://127.0.0.1:4000/login',json=invalid_credentials)
        assert response.json()=={'Error': 'Incorrect credentials'}
