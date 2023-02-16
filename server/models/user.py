from DB.database import Database
import hashlib

class User:
	def __init__(self):
		self.db = Database()
		self.table_name = 'User'

	def login(self, emailid, password):
		try:
			res = hashlib.md5(password.encode()).hexdigest()
			user = self.db.read(self.table_name, {"emailid": emailid})
			if user == {}:
				raise TypeError("Incorrect credentials")
			if(user["password"]==res):
				user.pop("password")
				return user
			raise TypeError("Incorrect credentials")
		except Exception as e:
			print(e)
			return {}

	def register(self, user_data):
		try:
			res = hashlib.md5(user_data['password'].encode()).hexdigest()
			user_data["password"] = res
			user_data["is_admin"] = False
			self.db.create(self.table_name, user_data)
			return self.db.read(self.table_name, {"emailid": user_data["emailid"]})
		except Exception as e:
			print(e)
			return {}


	def fetch_user(self, emailid):
		try:
			user = self.db.read(self.table_name, {"emailid": emailid})
			return user
		except Exception as e:
			print(e)
			return {}
	
	def fetch_users(self):
		try:
			cursor = self.db.read_all(self.table_name, {})
			users = [user for user in cursor]
			return users
		except Exception as e:
			print(e)
			return {}