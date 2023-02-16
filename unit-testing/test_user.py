import unittest
from server.models.user import User
from unittest.mock import patch

class UserUnitTesting(unittest.TestCase):
    def setUp(self):
        self.mock_user_data = {
            "emailid": "omkarsavoikar@gmail.com",
            "password": "password",
            "gender": "male",
            "is_admin": False,
        }
        self.mock_error = {}
    @patch("DB.database.Database.read")
    @patch("DB.database.Database.create")
    def test_register_existing_user(self,mock_create, mock_read):
        # Test case when the user already exists in the database
        mock_read.return_value = self.mock_error
        mock_create.return_value = False
        user = User()
        result = user.register(self.mock_user_data)
        self.assertEqual({}, result)

    @patch("DB.database.Database.read")
    @patch("DB.database.Database.create")
    def test_register_new_user(self,mock_read,mock_create):
        mock_read.return_value = True
        mock_create.return_value = self.mock_user_data
        user = User()
        result = user.register(self.mock_user_data)
        self.assertEqual(self.mock_user_data, result)

    @patch("DB.database.Database.read")
    @patch("DB.database.Database.create")
    def test_register_new_user_invalid_data(self,mock_create,mock_read):
        mock_read.return_value = {}
        mock_create.return_value = False
        user = User()
        result = user.register(self.mock_user_data)
        self.assertEqual({},result)


    @patch("DB.database.Database.read")
    def test_login_valid_credentials(self,mock_read):
        hashed_user = {
            "emailid": "omkarsavoikar@gmail.com",
            "password": "5f4dcc3b5aa765d61d8327deb882cf99",
            "gender": "male",
            "is_admin": False,
        }
        mock_read.return_value = hashed_user
        user = User()
        result = user.login(self.mock_user_data['emailid'],self.mock_user_data['password'])
        print(result)
        print(hashed_user)
        self.assertEqual(hashed_user,result)

    @patch("DB.database.Database.read")
    def test_login_invalid_credentials(self,mock_read):
        mock_read.return_value = {}
        user = User()
        result = user.login(self.mock_user_data['emailid'],self.mock_user_data['password'])
        self.assertEqual({},result)


    @patch("DB.database.Database.read")
    def test_fetching_a_user(self,mock_read):
        mock_read.return_value = self.mock_user_data
        user = User()
        result = user.fetch_user(self.mock_user_data['emailid'])
        self.assertEqual(self.mock_user_data,result)

    @patch("DB.database.Database.read_all")
    def test_fetching_users(self,mock_read_all):
        mock_read_all.return_value = self.mock_user_data
        user = User()
        result = user.fetch_users()
        self.assertTrue(type(result)==list)