from DB.database import Database
import bcrypt

class User:
	def __init__(self):
		self.db = Database().get_database()

	def login(self,email,password):
		try:
			# bytes = password.encode("utf-8")
			# salt = "b'$2b$12$lyTSirFB5Qeqv0VGl9GmNe'"
			# hash = str(bcrypt.hashpw(bytes, salt))
			# print(salt)
			# print("b'$2b$12$VV7W1vaScWnMGMtaN1nd2O14qQu/TwvyUNRW.4MprjJmKXJmRaYTi'")
			user = self.db.User.find_one({"emailid":email})
			if(user["password"]==password):
				user.pop("password")
				return user
			return {}
		except:
			return {}

	def register(self, user_data):
		try:
			table = self.db.User
			password = user_data["password"]
			# bytes = password.encode("utf-8")
			# salt = "b'$2b$12$lyTSirFB5Qeqv0VGl9GmNe'"
			# hash = str(bcrypt.hashpw(bytes, salt))
			# print(hash)
			table.insert_one({
				"emailid": user_data["emailid"],
				"password": password,
				"gender": user_data["gender"],
				"is_admin": False,
			})
			return self.fetch_user(user_data["emailid"])
		except Exception as e:
			return {}


	def fetch_user(self,emailid):
		try:
			user = self.db.User.find_one({"emailid": emailid})
			return user
		except Exception as e:
			return {}
	
	def fetch_users(self):
		try:
			cursor = self.db.User.find({})
			users = [user for user in cursor]
			return users
		except Exception as e:
			return {}