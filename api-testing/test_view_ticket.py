import requests




class TestViewTicket:
    def test_status_code(self):
        response = requests.get('http://127.0.0.1:4000/ticket/63e49ceca788d71cb4dae60c')
        assert response.status_code==201

    def test_for_valid_user_id(self):
        response = requests.get('http://127.0.0.1:4000/ticket/63e49ceca788d71cb4dae60c')
        assert response.text!="Error"

    def test_for_invalid_user_id(self):
        response = requests.get('http://127.0.0.1:4000/ticket/63e49ceca788d71cb4d')
        assert response.text=='Error'
