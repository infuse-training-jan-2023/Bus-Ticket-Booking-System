from DB.database import Database

class User:
	def __init__(self) -> None:
		self.db = Database()
		self.collection_name = "User"
		self.fields = {
			"user_id": "string",
			"emailid": "string",
			"password": "string",
			"gender": "string",
			"is_admin": "boolean"
		}
		