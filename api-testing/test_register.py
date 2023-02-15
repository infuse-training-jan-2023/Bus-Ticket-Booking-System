
import requests
import random

user_info = {
    "emailid":"opq{}@gmail.com".format(random.randint(0,1000)),
    "gender":"Male",
    "password":"$2b$12$asd.5FBFuTWjXvQyl2accH83J7VpXItJ4WK",
    "is_admin":"false"
}
class TestRegister:
    def test_status_code(self):
        user_info['emailid']="opq{}@gmail.com".format(random.randint(0,1000))
        response = requests.post('http://127.0.0.1:4000/register',json=user_info)
        assert response.status_code==201

    def test_for_valid_info(self):
        user_info['emailid']="opq{}@gmail.com".format(random.randint(0,1000))
        response = requests.post('http://127.0.0.1:4000/register',json=user_info)
        assert response.text!="Error"


    def test_for_invalid_info(self):
        response = requests.post('http://127.0.0.1:4000/register',json={})
        assert response.json()=={"Error": "Could not register user. Try again."}