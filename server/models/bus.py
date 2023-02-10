from DB.database import Database


class Bus:
    def __init__(self)->None:
        self.db = Database()
        self.collection_name= "Bus"


bus = Bus()
bus.add_selected_seats("63e4b5ac219ec66d45de9b35", ['a2', 'a3'], "2023-02-12")