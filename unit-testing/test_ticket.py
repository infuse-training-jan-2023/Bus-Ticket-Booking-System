import unittest
from unittest.mock import patch
from server.models.ticket import Ticket

class TicketUnitTesting(unittest.TestCase):
    def setUp(self):
        self.ticket = {
            '_id':'63e4be76219ec66d45de9b42',
            "bus_id": "63e4af4b219ec66d45de9b2d",
            "user_id": "63e49ceca788d71cb4dae60c",
            "date": "2023-02-18",
            "ticket_price": 1300,
            "selected_seats": ['a1','a2'],
            "status": True
        }
        self.bus_data={
                "start_city": 'goa',
                "destination_city": 'delhi',
                "arrival_time": 1600,
                "departure_time": 1800,
        }
        self.ticket_booked={
                "ticket_id": '63e4be76219ec66d45de9b42',
                "bus_id": "63e4af4b219ec66d45de9b2d",
                "user_id": "63e49ceca788d71cb4dae60c",
                "date": "2023-02-18",
                "start_city": self.bus_data["start_city"],
                "destination_city": self.bus_data["destination_city"],
                "arrival_time": self.bus_data["arrival_time"],
                "departure_time": self.bus_data["departure_time"],
                "ticket_price": 1300,
                "selected_seats": ['a1','a2'],
                "status": True
        }

    @patch("models.ticket.Ticket.book_ticket")
    def test_book_ticket(self,mock_book_ticket):
        mock_book_ticket.return_value = self.ticket_booked
        api = Ticket()
        bus_id = self.ticket['bus_id']
        user_id = self.ticket['user_id']
        date = self.ticket['date']
        ticket_price = self.ticket['ticket_price']
        selected_seats = self.ticket['selected_seats']
        result = api.book_ticket(bus_id,user_id,ticket_price,date,selected_seats,'sunday')
        print(result)
        self.assertEqual(self.ticket_booked, result)

    @patch("models.ticket.Ticket.book_ticket")
    def test_book_ticket_negative(self,mock_book_ticket):
        mock_book_ticket.return_value = {}
        api = Ticket()
        bus_id = self.ticket['bus_id']
        user_id = self.ticket['user_id']
        date = self.ticket['date']
        ticket_price = self.ticket['ticket_price']
        selected_seats = self.ticket['selected_seats']
        result = api.book_ticket(bus_id,user_id,ticket_price,date,selected_seats,'sunday')
        print(result)
        self.assertEqual({}, result)

    @patch("DB.database.Database.read")
    def test_view_tickets_of_user(self,mock_read):
        mock_read.return_value = self.ticket
        user_id = self.ticket['user_id']
        ticket = Ticket()
        result = ticket.view_tickets_of_user(user_id)
        self.assertTrue(type(result)==list)

    @patch("DB.database.Database.read")
    def test_get_ticket(self,mock_read):
        mock_read.return_value = self.ticket
        user_id = self.ticket['_id']
        ticket = Ticket()
        result = ticket.get_ticket(user_id)
        self.assertEqual(self.ticket,result)

    @patch("DB.database.Database.read_all")
    def test_get_ticket_invalid_id(self,mock_read):
        mock_read.return_value = []
        user_id = self.ticket['user_id']
        ticket = Ticket()
        result = ticket.view_tickets_of_user(user_id)
        print(result)
        self.assertEqual([],result)

    @patch("DB.database.Database.update")
    @patch("models.bus.Bus.remove_bus_seats")
    def test_cancel_tickets(self,mock_remove_seats,mock_update):
        mock_update.return_value = True
        mock_remove_seats.return_value = True
        ticket_id = self.ticket['_id']
        ticket = Ticket()
        result = ticket.cancel_tickets(ticket_id,self.ticket['date'])
        self.assertEqual({'Status': 'Ticket cancelled successfully'},result)

    @patch("DB.database.Database.update")
    @patch("models.bus.Bus.remove_bus_seats")
    def test_cancel_tickets_invalid_id(self,mock_remove_seats,mock_update_one):
        mock_update_one.return_value = False
        mock_remove_seats.return_value = {}
        ticket_id = {self.ticket['_id']}
        ticket = Ticket()
        result = ticket.cancel_tickets(ticket_id,self.ticket['date'])
        self.assertEqual({},result)



