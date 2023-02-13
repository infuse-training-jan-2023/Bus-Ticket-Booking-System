import unittest
from unittest.mock import Mock
from models.user import User

import unittest
from unittest.mock import MagicMock, patch

class UnitTestCase(unittest.TestCase):
    def setUp(self):
        self.mock_user_data = {
            "emailid": "testuser@email.com",
            "password": "testpassword",
            "gender": "male",
            "is_admin": False,
        }
        self.mock_error = {}
    @patch("pymongo.collection.Collection.find_one")
    def test_register_existing_user(self, mock_find_one):
        # Test case when the user already exists in the database
        mock_find_one.return_value = self.mock_error
        api = User()
        result = api.register(self.mock_user_data)
        self.assertEqual({}, result)
        mock_find_one.assert_called_once_with({"emailid": self.mock_user_data["emailid"]})

    @patch("pymongo.collection.Collection.find_one")
    def test_register_new_user(self, mock_find_one):
        # Test case when the user does not exist in the database
        mock_find_one.return_value = self.mock_user_data
        api = User()
        result = api.register(self.mock_user_data)
        self.assertEqual(self.mock_user_data, result)
        mock_find_one.assert_called_once_with({"emailid": self.mock_user_data["emailid"]})

    @patch("pymongo.collection.Collection.find_one")
    def test_register_new_user_invalid_data(self,mock_find_one):
        mock_find_one.return_value = {}
        api = User()
        result = api.register(self.mock_user_data)
        self.assertEqual({},result)
        mock_find_one.assert_called_once_with({"emailid": self.mock_user_data["emailid"]})

    # test login
    @patch("pymongo.collection.Collection.find_one")
    def test_login_valid_credentials(self,mock_find_one):
        mock_find_one.return_value = self.mock_user_data
        api = User()
        result = api.login(self.mock_user_data['emailid'],self.mock_user_data['password'])
        self.assertEqual(self.mock_user_data,result)

    @patch("pymongo.collection.Collection.find_one")
    def test_login_invalid_credentials(self,mock_find_one):
        mock_find_one.return_value = {}
        api = User()
        result = api.login(self.mock_user_data['emailid'],self.mock_user_data['password'])
        self.assertEqual({},result)


    # test fetching a user
    @patch("pymongo.collection.Collection.find_one")
    def test_fetching_a_user(self,mock_find_one):
        mock_find_one.return_value = self.mock_user_data
        api = User()
        result = api.fetch_user(self.mock_user_data['emailid'])
        self.assertEqual(self.mock_user_data,result)

#    testing fetching all users
    @patch("pymongo.collection.Collection.find")
    def test_fetching_users(self,mock_find):
        mock_find.return_value = self.mock_user_data
        api = User()
        result = api.fetch_users()
        self.assertTrue(type(result)==list)





