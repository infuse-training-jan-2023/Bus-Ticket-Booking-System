import requests



user_id = {
    'emailid':'abc@gmail.com'
}
class TestFetchUser:
    def test_status_code(self):
        response = requests.get('http://127.0.0.1:4000/user',json=user_id)
        assert response.status_code==201


    def test_fetch_user(self):
        response = requests.get('http://127.0.0.1:4000/user',json=user_id)
        assert response.text!="Error"

    def test_fetch_user_invalid(self):
        user_id['emailid']='invalid'
        response = requests.get('http://127.0.0.1:4000/user',json=user_id)
        assert response.text=="null"



