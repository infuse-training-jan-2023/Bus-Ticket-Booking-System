from user import User
from bus import Bus


user = User()
bus = Bus()
# result = user.login("abc@gmail.com","$2b$12$5Z3oUqb9mwdbPdQ7kceJQ.5FBFuTWjXvQyl2accH83J7VpXItJ4WK")
# user_data = {
#     "emailid":"lakshman@gmail.com",
#     "gender":"Male",
#     "password":"asddfghdfdsfffasdfffdf90834lkj",
#     "is_admin":"false"
# }
# result = user.register(user_data)
result = bus.delete_bus('63e4af4b219ec66d45de9b2d')
print(result)
