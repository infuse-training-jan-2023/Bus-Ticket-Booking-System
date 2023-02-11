import requests
success_result = {"status":"cancel success"}
ticket_to_be_deleted ={
    'ticket_id':'63e752ef10bf6d7c4269eb4e',
    'date':'2023-02-22'
    }
def test_api_call_exists():
    response = requests.put('http://127.0.0.1:4000/ticket',json=ticket_to_be_deleted)
    assert response.status_code==201

def test_status_code():
    response = requests.put('http://127.0.0.1:4000/ticket',json=ticket_to_be_deleted)
    assert response.status_code==201

def test_response_for_valid_credentials():
    response = requests.put('http://127.0.0.1:4000/ticket',json=ticket_to_be_deleted)
    assert response.text!="Error"

# no matter what the field names are or the values it always responds with the status code 201
def test_response_for_invalid_credentials():
    ticket_to_be_deleted['ticket_idd']=3
    response = requests.put('http://127.0.0.1:4000/ticket',json=ticket_to_be_deleted)
    print(response)
    assert response.status_code==201
