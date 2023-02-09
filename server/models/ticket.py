from DB.database import Database

class Ticket():
    def __init__(self):
        self.db = Database()
        self.collection_name = 'Ticket'  # collection name
