import requests


user_id = {
    "user_id":"63e4ace5ebfd77dd9c2a8ae2"
}

class TestViewTicket:
    def test_status_code(self):
        response = requests.get('http://127.0.0.1:4000/ticket',json=user_id)
        assert response.status_code==201

    def test_for_valid_user_id(self):
        response = requests.get('http://127.0.0.1:4000/ticket',json=user_id)
        assert response.text!="Error"


    def test_for_invalid_user_id(self):
        user_id['user_id']='invalid'
        response = requests.get('http://127.0.0.1:4000/ticket',json=user_id)
        assert response.text=='Error'
