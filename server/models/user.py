import sys
sys.path.append("../")
from DB.database import Database

class User:
	def __init__(self) -> None:
		self.db = Database().get_database()
		
	def view_all(self):
		try:
			table = self.db.User
			cursor = table.find()
			return cursor
		except Exception as e:
			return {}