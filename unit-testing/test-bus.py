import unittest
from unittest.mock import Mock
import sys
sys.path.append('../')
from server.models.user import User

class LoginTest(unittest.TestCase):
    def setUp(self):
        self.db = Mock()

    def test_login_success(self):
        # Arrange
        email = "test@example.com"
        password = "password"
        user = {"emailid": email, "password": password, "name": "Test User"}
        self.db.User.find_one.return_value = user

        # Act
        result = self.login(email, password)

        # Assert
        self.assertEqual(result, {"emailid": email, "name": "Test User"})
        self.db.User.find_one.assert_called_with({"emailid": email})

    def test_login_failure_wrong_password(self):
        # Arrange
        email = "test@example.com"
        password = "password"
        user = {"emailid": email, "password": "wrong password", "name": "Test User"}
        self.db.User.find_one.return_value = user

        # Act
        result = self.login(email, password)

        # Assert
        self.assertEqual(result, {})
        self.db.User.find_one.assert_called_with({"emailid": email})

    def test_login_failure_user_not_found(self):
        # Arrange
        email = "test@example.com"
        password = "password"
        self.db.User.find_one.return_value = None

        # Act
        result = self.login(email, password)

        # Assert
        self.assertEqual(result, {})
        self.db.User.find_one.assert_called_with({"emailid": email})
