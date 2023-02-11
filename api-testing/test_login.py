
import requests
valid_credentials = {
    "emailid":"abc@gmail.com",
    "password":"$2b$12$5Z3oUqb9mwdbPdQ7kceJQ.5FBFuTWjXvQyl2accH83J7VpXItJ4WK"}
invalid_credentials={
    "emailid":"anything@gmail.com",
    "password":"anything"
}
def test_api_call_exists():
    response = requests.post('http://127.0.0.1:4000/login',json=valid_credentials)
    assert response.status_code==200

def test_status_code():
    response = requests.post('http://127.0.0.1:4000/login',json=valid_credentials)
    assert response.status_code==200

def test_response_for_valid_credentials():
    response = requests.post('http://127.0.0.1:4000/login',json=valid_credentials)
    assert response.json()!={}

def test_response_for_invalid_credentials():
    response = requests.post('http://127.0.0.1:4000/login',json=invalid_credentials)
    assert response.text=='Error'
