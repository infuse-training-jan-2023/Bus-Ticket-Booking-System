import sys
sys.path.append('../')
from DB.database import Database

class User:
	def __init__(self) -> None:
		self.db = Database().get_database()

	def login(self,email,password):
		try:
			table = self.db.User
			retreived_record = table.find({"emailid":email})
			retrieved_password = retreived_record.next()["password"]
			if(retrieved_password==password):
				return 'valid'
			return 'invalid password'
		except StopIteration as e:
			return "email address does not exist"

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
			return "user added successfully"
		except Exception as e:
			print(e)


