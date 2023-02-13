#from models.ticket import Ticket
from DB.database import Database

tickets_object=Ticket()


def test_view_tickets_of_user_makes_db_call(mocker):
    mock = mocker.patch('models.ticket.Ticket.view_tickets_of_user',return_value = [])
    _ = tickets_object.view_tickets_of_user()
    assert mock.call_count == 1

# def view_ticket_of_user(mocker):
#     mock = mocker.patch('models.ticket.Ticket.view_tickets_of_user', return_value = items)
#     item_returned = item_repo.view_tickets_of_user()
#     for i, item in enumerate(item_returned):
#         assert item == items[i]