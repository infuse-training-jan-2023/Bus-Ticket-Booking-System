import unittest
from unittest.mock import patch
from models.ticket import Ticket

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

    @patch("pymongo.collection.Collection.insert_one")
    @patch("models.bus.Bus.add_selected_seats")
    # @patch("pymongo.collection.Collection.ticket._id", "63e4be76219ec66d45de9b42")
    def test_book_ticket(self, mock_add_selected_seats,mock_insert_one):

        mock_insert_one.return_value = self.ticket
        # mock_inserted_id.return_value = self.ticket['_id']
        mock_add_selected_seats.return_value= {
                "start_city": 'goa',
                "destination_city": 'delhi',
                "arrival_time": 1600,
                "departure_time": 1800}
        api = Ticket()
        bus_id = self.ticket['bus_id']
        user_id = self.ticket['user_id']
        date = self.ticket['date']
        ticket_price = self.ticket['ticket_price']
        selected_seats = self.ticket['selected_seats']
        result = api.book_ticket(bus_id,user_id,date,ticket_price,selected_seats,'sunday')
        self.assertEqual(self.ticket_booked, result)

    @patch("pymongo.collection.Collection.find")
    def test_view_tickets_of_user(self,mock_find):
        mock_find.return_value = self.ticket
        user_id = self.ticket['user_id']
        ticket = Ticket()
        result = ticket.view_tickets_of_user(user_id)
        self.assertTrue(type(result)==list)

    @patch("pymongo.collection.Collection.find")
    def test_get_ticket(self,mock_find):
        mock_find.return_value = [self.ticket]
        user_id = self.ticket['_id']
        ticket = Ticket()
        result = ticket.get_ticket(user_id)
        self.assertEqual([self.ticket],result)

    @patch("pymongo.collection.Collection.find")
    def test_get_ticket_invalid_id(self,mock_find):
        mock_find.return_value = []
        user_id = self.ticket['user_id']
        ticket = Ticket()
        result = ticket.view_tickets_of_user(user_id)
        self.assertEqual([],result)

    @patch("pymongo.collection.Collection.update_one")
    @patch("models.bus.Bus.remove_bus_seats")
    def test_cancel_tickets(self,mock_remove_seats,mock_update_one):
        mock_update_one.return_value = True
        mock_remove_seats.return_value = True
        ticket_id = self.ticket['_id']
        ticket = Ticket()
        result = ticket.cancel_tickets(ticket_id,self.ticket['date'])
        self.assertEqual({"status":"cancel success"},result)

    @patch("pymongo.collection.Collection.update_one")
    @patch("models.bus.Bus.remove_bus_seats")
    def test_cancel_tickets_invalid_ticket_id(self,mock_remove_seats,mock_update_one):
        mock_update_one.return_value = False
        mock_remove_seats.return_value = {}
        ticket_id = self.ticket['_id']
        ticket = Ticket()
        result = ticket.cancel_tickets(ticket_id,self.ticket['date'])
        self.assertEqual({},result)



