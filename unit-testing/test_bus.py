import unittest
from unittest.mock import patch
from server.models.bus import Bus

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
            'id':'63e4b5ac219ec66d45de9b35',
            "start_city": self.bus["start_city"],
            "destination_city": self.bus["destination_city"],
            "seat_price": self.bus["seat_price"],
            "arrival_time":1800,
            "departure_time":2000

        }
        self.error = {}
    @patch('server.DB.database.Database.delete')
    def test_delete_bus(self,mock_delete_one):
        mock_delete_one.return_value = True
        bus = Bus()
        result = bus.delete_bus(self.bus['_id'])
        self.assertEqual({"Success": "Bus deleted successfully"}, result)

    @patch('server.DB.database.Database.read_all')
    def test_find_all_buses(self,mock_read_all):
        mock_read_all.return_value =  [self.bus]
        result= Bus().find_all_buses()
        self.assertTrue(type(result)==list)

    @patch('server.DB.database.Database.read')
    def test_find_a_bus(self,mock_read):
        mock_read.return_value =  self.bus
        bus = Bus()
        result= bus.find_a_bus(self.bus['_id'])
        self.assertEqual(self.bus,result)

    @patch('server.DB.database.Database.read_all')
    def test_filter_search(self,mock_find):
        mock_find.return_value = [self.bus]
        bus = Bus()
        result = bus.filter_search(self.filters)
        # print(result)
        self.assertEqual([self.result],result)

    @patch('server.DB.database.Database.read_all')
    def test_filter_negative(self,mock_read_all):
        mock_read_all.return_value = []
        bus = Bus()
        result = bus.filter_search(self.filters)
        self.assertEqual([],result)

    @patch('server.models.bus.Bus.add_selected_seats')
    def test_add_selected_seats(self,mock_selected_seats):
        received_bus = {
                "start_city": self.bus["start_city"],
                "destination_city": self.bus["destination_city"],
                "arrival_time": self.bus['routine'][0]['arrival_time'],
                "departure_time": self.bus['routine'][0]['departure_time']
        }
        mock_selected_seats.return_value = received_bus
        bus = Bus()
        bus_id=self.bus['_id']
        selected_seats = ['b1']
        date = '2023-02-12'
        day = 'sunday'
        result = bus.add_selected_seats(bus_id,selected_seats,date,day)
        self.assertEqual(received_bus,result)

    @patch('server.DB.database.Database.update')
    @patch('server.models.bus.Bus.find_a_bus')
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
    @patch('server.DB.database.Database.update_all')
    @patch('server.models.ticket.Ticket.get_ticket')
    def test_remove_bus_seats(self,mock_get_ticket,mock_update_all):
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
        mock_update_all.return_value = True
        bus = Bus()
        result = bus.remove_bus_seats(ticket['_id'],ticket['date'])
        self.assertEqual({"Status":"True"},result)

    @patch('server.DB.database.Database.update_all')
    @patch('server.models.ticket.Ticket.get_ticket')
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
        mock_get_ticket.return_value= [ticket]
        mock_update_many.return_value = True
        bus = Bus()
        result = bus.remove_bus_seats(ticket['_id'],ticket['date'])
        self.assertEqual({},result)














