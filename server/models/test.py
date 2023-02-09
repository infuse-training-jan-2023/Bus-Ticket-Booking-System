from user import User


user = User()
# result = user.login("abc@gmail.com","$2b$12$5Z3oUqb9mwdbPdQ7kceJQ.5FBFuTWjXvQyl2accH83J7VpXItJ4WK")
user_data = {
    "emailid":"sahil.sagaonkar@gmail.com",
    "gender":"Male",
    "password":"980324759ljkhl;kasdf90834lkj",
    "is_admin":"false"
}
result = user.register(user_data)
print(result)
