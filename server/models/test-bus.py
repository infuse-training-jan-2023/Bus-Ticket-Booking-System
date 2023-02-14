import unittest
from unittest.mock import patch
from models.ticket import Ticket
from models.bus import Bus


class BusUnitTesting(unittest.TestCase):
    def setUp(self):
        self.bus = {
            '_id':'63e4b5ac219ec66d45de9b35',
            'bus_type':'ac',
            'start_city':'goa',
            'destination_city':'delhi',
            'routine':[{
                'day':'sunday',
                'arrival_time':1800,
                'departure_time':2000
            }],
            'booked_seat':[
                [
                    {
                        'seat_numbers':['a1','a2'],
                        'date_of_journey':'2023-02-12'
                    }
                ]
            ],
            'seat_price':1500
        }
        self.filters={
            'routine.day':"sunday",
            'arrival_time':1800,
            'departure_time':2000
        }
        self.result = {
            "start_city": self.bus["start_city"],
            "destination_city": self.bus["destination_city"],
            "seat_price": self.bus["seat_price"],
            "arrival_time":1800,
            "departure_time":2000

        }
        self.error = {}
    @patch('pymongo.collection.Collection.delete_one')
    def test_delete_bus(self,mock_delete_one):
        mock_delete_one.return_value = True
        bus = Bus()
        result = bus.delete_bus(self.bus['_id'])
        self.assertEqual({"Success": "Bus deleted successfully"}, result)

    @patch('pymongo.collection.Collection.find')
    def test_find_all_buses(self,mock_find):
        mock_find.return_value =  self.bus
        bus = Bus()
        result= bus.find_all_buses()
        self.assertTrue(type(result)==list)

    @patch('pymongo.collection.Collection.find_one')
    def test_find_a_bus(self,mock_find_one):
        mock_find_one.return_value =  self.bus
        bus = Bus()
        result= bus.find_a_bus(self.bus['_id'])
        self.assertEqual(self.bus,result)

    @patch('pymongo.collection.Collection.find')
    def test_filter_search(self,mock_find):
        mock_find.return_value = [self.bus]
        bus = Bus()
        result = bus.filter_search(self.filters)
        self.assertEqual([self.result],result)

    @patch('pymongo.collection.Collection.find')
    def test_filter_negative(self,mock_find):
        mock_find.return_value = []
        bus = Bus()
        result = bus.filter_search(self.filters)
        self.assertEqual([],result)

    @patch('pymongo.collection.Collection.update_one')
    @patch('models.bus.Bus.find_a_bus')
    def test_add_selected_seats(self,mock_find_a_bus,mock_update_one):
        mock_update_one.return_value = True
        mock_find_a_bus.return_value = self.bus
        bus = Bus()
        bus_id=self.bus['_id']
        selected_seats = ['b1']
        date = '2023-02-12'
        day = 'sunday'
        received_bus = {
                "start_city": self.bus["start_city"],
                "destination_city": self.bus["destination_city"],
                "arrival_time": self.bus['routine'][0]['arrival_time'],
                "departure_time": self.bus['routine'][0]['departure_time']
        }
        result = bus.add_selected_seats(bus_id,selected_seats,date,day)
        self.assertEqual(received_bus,result)

    @patch('pymongo.collection.Collection.update_one')
    @patch('models.bus.Bus.find_a_bus')
    def test_add_selected_seats_invalid_id(self,mock_find_a_bus,mock_update_one):
        mock_update_one.return_value = False
        mock_find_a_bus.return_value = []
        bus = Bus()
        bus_id=self.bus['_id']
        selected_seats = ['b1']
        date = '2023-02-12'
        day = 'sunday'
        result = bus.add_selected_seats(bus_id,selected_seats,date,day)
        self.assertEqual({},result)

    @patch('pymongo.collection.Collection.update_many')
    @patch('models.ticket.Ticket.get_ticket')
    def test_remove_bus_seats(self,mock_get_ticket,mock_update_many):
        ticket = {
            '_id':'63e4bf8a219ec66d45de9b48',
            'bus_id':'63e4af4b219ec66d45de9b2d',
            'user_id':'63e49ceca788d71cb4dae60c',
            'date':'2023-02-19',
            'ticket_price':2000,
            'selected_seats':['a1','a2'],
            'status':False
        }
        mock_get_ticket.return_value= [ticket]
        mock_update_many.return_value = True
        bus = Bus()
        result = bus.remove_bus_seats(ticket['_id'],ticket['date'])
        self.assertEqual(True,result)

    @patch('pymongo.collection.Collection.update_many')
    @patch('models.ticket.Ticket.get_ticket')
    def test_remove_bus_seats_negative(self,mock_get_ticket,mock_update_many):
        ticket = {
            '_id':'63e4bf8a219ec66d45de9b48',
            'bus_id':'63e4af4b219ec66d45de9b2d',
            'user_id':'63e49ceca788d71cb4dae60c',
            'date':'2023-02-19',
            'ticket_price':2000,
            'selected_seats':['a1','a2'],
            'status':False
        }
        mock_get_ticket.return_value= ticket
        mock_update_many.return_value = True
        bus = Bus()
        result = bus.remove_bus_seats(ticket['_id'],ticket['date'])
        self.assertEqual({},result)














