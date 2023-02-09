from DB.database import Database

class Ticket(object):
    def __init__(self):
        self.db = Database()
        self.collection_name = 'Ticket'  # collection name
