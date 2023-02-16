import unittest
from models.user import User
from unittest.mock import patch

class UserUnitTesting(unittest.TestCase):
    def setUp(self):
        self.mock_user_data = {
            "emailid": "testuser@email.com",
            "password": "testpassword",
            "gender": "male",
            "is_admin": False,
        }
        self.mock_error = {}
    @patch("pymongo.collection.Collection.find_one")
    @patch("pymongo.collection.Collection.insert_one")
    def test_register_existing_user(self,mock_insert_one, mock_find_one):
        # Test case when the user already exists in the database
        mock_find_one.return_value = self.mock_error
        mock_insert_one.return_value = False
        user = User()
        result = user.register(self.mock_user_data)
        self.assertEqual({}, result)
        mock_find_one.assert_called_with({"emailid": self.mock_user_data["emailid"]})

    @patch("pymongo.collection.Collection.find_one")
    @patch("pymongo.collection.Collection.insert_one")
    @patch("models.user.User.fetch_user")
    def test_register_new_user(self,mock_fetch_user,mock_insert_one, mock_find_one):
        mock_find_one.return_value = False
        mock_insert_one.return_value = True
        mock_fetch_user.return_value = self.mock_user_data
        user = User()
        result = user.register(self.mock_user_data)
        self.assertEqual(self.mock_user_data, result)
        mock_find_one.assert_called_with({"emailid": self.mock_user_data["emailid"]})

    @patch("pymongo.collection.Collection.find_one")
    @patch("pymongo.collection.Collection.insert_one")
    def test_register_new_user_invalid_data(self,mock_insert_one,mock_find_one):
        mock_find_one.return_value = {}
        mock_insert_one.return_value = False
        user = User()
        result = user.register(self.mock_user_data)
        self.assertEqual({},result)
        mock_find_one.assert_called_with({"emailid": self.mock_user_data["emailid"]})

    # test login
    @patch("pymongo.collection.Collection.find_one")
    def test_login_valid_credentials(self,mock_find_one):
        mock_find_one.return_value = self.mock_user_data
        user = User()
        result = user.login(self.mock_user_data['emailid'],self.mock_user_data['password'])
        self.assertEqual(self.mock_user_data,result)

    @patch("pymongo.collection.Collection.find_one")
    def test_login_invalid_credentials(self,mock_find_one):
        mock_find_one.return_value = {}
        user = User()
        result = user.login(self.mock_user_data['emailid'],self.mock_user_data['password'])
        self.assertEqual({},result)


    # test fetching a user
    @patch("pymongo.collection.Collection.find_one")
    def test_fetching_a_user(self,mock_find_one):
        mock_find_one.return_value = self.mock_user_data
        user = User()
        result = user.fetch_user(self.mock_user_data['emailid'])
        self.assertEqual(self.mock_user_data,result)

#    testing fetching all users
    @patch("pymongo.collection.Collection.find")
    def test_fetching_users(self,mock_find):
        mock_find.return_value = self.mock_user_data
        user = User()
        result = user.fetch_users()
        self.assertTrue(type(result)==list)





