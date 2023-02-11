
import requests
import random

user_info = {
    "emailid":"opq{}@gmail.com".format(random.randint(0,1000)),
    "gender":"Male",
    "password":"$2b$12$asd.5FBFuTWjXvQyl2accH83J7VpXItJ4WK",
    "is_admin":"false"
}
def test_api_call_exists():
    response = requests.post('http://127.0.0.1:4000/register',json=user_info)
    assert response.status_code==200


def test_status_code():
    user_info['emailid']="opq{}@gmail.com".format(random.randint(0,1000))
    response = requests.post('http://127.0.0.1:4000/register',json=user_info)
    assert response.status_code==200

def test_response_for_valid_info():
    user_info['emailid']="opq{}@gmail.com".format(random.randint(0,1000))
    response = requests.post('http://127.0.0.1:4000/register',json=user_info)
    assert response.text!="Error"


def test_response_for_invalid_credentials():
    response = requests.post('http://127.0.0.1:4000/register',json={})
    assert response.text=='Error'
