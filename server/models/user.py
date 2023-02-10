from DB.database import Database

class User:
	def __init__(self):
		self.db = Database().get_database()

	def login(self,email,password):
		try:
			table = self.db.User
			retreived_record = table.find_one({"emailid":email})
			retrieved_password = retreived_record["password"]
			retreived_record.pop('password')
			if(retrieved_password==password):
				return retreived_record
			return {'Error':'Invalid password'}
		except StopIteration as e:
			return {'Error':"EmailID address does not exist"}


	def register(self, user_data):
		try:
			received_emailid = user_data['emailid']
			received_password = user_data['password']
			received_gender = user_data['gender']
			received_is_admin= user_data['is_admin']
			table = self.db.User
			table.insert_one({
				"emailid":str(received_emailid),
				"gender":str(received_gender),
				"password":str(received_password),
				"is_admin":str(received_is_admin)
				})
			record = self.fetch_user(received_emailid)
			return str(record)
		except Exception as e:
			return {}


	def fetch_user(self,emailid):
		try:
			return self.db.User.find_one({"emailid": emailid})
		except Exception as e:
			return {"Error": e}
	
	def fetch_users(self):
		try:
			cursor = self.db.User.find({})
			users = []
			for user in cursor:
				# x = user["_id"]
				# user.pop('_id')
				# print(id.oid)
				users.append(user)
			# users = [user for user in cursor]
			return users
		except Exception as e:
			return {}