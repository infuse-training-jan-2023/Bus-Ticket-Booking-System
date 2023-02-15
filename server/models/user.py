from DB.database import Database
# import bcrypt

class User:
	def __init__(self):
		self.db = Database()
		self.table_name = 'User'

	def login(self, emailid, password):
		try:
			# bytes = password.encode("utf-8")
			# salt = "b'$2b$12$lyTSirFB5Qeqv0VGl9GmNe'"
			# hash = str(bcrypt.hashpw(bytes, salt))
			# print(salt)
			# print("b'$2b$12$VV7W1vaScWnMGMtaN1nd2O14qQu/TwvyUNRW.4MprjJmKXJmRaYTi'")
			user = self.db.read(self.table_name, {"emailid": emailid})
			if user == {}:
				raise TypeError("Incorrect credentials")
			if(user["password"]==password):
				user.pop("password")
				return user
			raise TypeError("Incorrect credentials")
		except Exception as e:
			print(e)
			return {}

	def register(self, user_data):
		try:
			# table = self.db.get_database().User
			# table.insert_one({
			# 	"emailid": user_data["emailid"],
			# 	"password": password,
			# 	"gender": user_data["gender"],
			# 	"is_admin": False,
			# })
			user_data["is_admin"] = False
			self.db.create(self.table_name, user_data)
			# password = user_data["password"]
			# bytes = password.encode("utf-8")
			# salt = "b'$2b$12$lyTSirFB5Qeqv0VGl9GmNe'"
			# hash = str(bcrypt.hashpw(bytes, salt))
			# print(hash)
			return self.db.read(self.table_name, {"emailid": user_data["emailid"]})
		except Exception as e:
			print(e)
			return {}


	def fetch_user(self, emailid):
		try:
			user = self.db.read(self.table_name, {"emailid": emailid})
			print(user)
			return user
		except Exception as e:
			print(e)
			return {}

	def fetch_users(self):
		try:
			cursor = self.db.read_all(self.table_name)
			users = [user for user in cursor]
			return users
		except Exception as e:
			print(e)
			return {}
