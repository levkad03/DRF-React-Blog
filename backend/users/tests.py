from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.serializers import ValidationError

from .models import NewUser
from .serializers import RegisterUserSerializer, UpdateProfileSerializer


class CustomAccountManagerTest(TestCase):
    def setUp(self):
        self.user_model = get_user_model()

    def test_create_user(self):
        user = self.user_model.objects.create_user(
            email="test@example.com",
            user_name="testuser",
            first_name="Test",
            password="testpassword123",
        )

        self.assertEqual(user.email, "test@example.com")
        self.assertEqual(user.user_name, "testuser")
        self.assertEqual(user.first_name, "Test")
        self.assertTrue(user.check_password("testpassword123"))
        self.assertFalse(user.is_staff)
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_superuser)

    def test_create_user_without_email(self):
        with self.assertRaisesMessage(ValueError, "You must provide an email address"):
            self.user_model.objects.create_user(
                email="",
                user_name="testuser",
                first_name="Test",
                password="testpassword123",
            )

    def test_create_superuser(self):
        superuser = self.user_model.objects.create_superuser(
            email="superuser@example.com",
            user_name="superuser",
            first_name="Super",
            password="superpassword123",
        )

        self.assertEqual(superuser.email, "superuser@example.com")
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.is_superuser)

    def test_create_superuser_without_is_staff(self):
        with self.assertRaisesMessage(
            ValueError, "Superuser must be assigned to is_staff=True."
        ):
            self.user_model.objects.create_superuser(
                email="superuser@example.com",
                user_name="superuser",
                first_name="Super",
                password="superpassword123",
                is_staff=False,
            )

    def test_create_superuser_without_is_superuser(self):
        with self.assertRaisesMessage(
            ValueError, "Superuser must be assigned to is_superuser=True."
        ):
            self.user_model.objects.create_superuser(
                email="superuser@example.com",
                user_name="superuser",
                first_name="Super",
                password="superpassword123",
                is_superuser=False,
            )


class RegisterUserSerializerTest(TestCase):
    def setUp(self):
        self.valid_data = {
            "email": "valid@example.com",
            "user_name": "validuser",
            "password": "Valid1234",
        }
        self.invalid_data_password = {
            "email": "valid@example.com",
            "user_name": "validuser",
            "password": "invalid",
        }
        self.invalid_data_email = {
            "email": "invalidemail",
            "user_name": "validuser",
            "password": "Valid1234",
        }
        NewUser.objects.create_user(
            email="existinguser@example.com",
            user_name="existinguser",
            password="Existing123",
            first_name="Existing",
        )

    def test_valid_data(self):
        serializer = RegisterUserSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.email, "valid@example.com")
        self.assertTrue(user.check_password("Valid1234"))

    def test_create_user_invalid_password(self):
        data_no_uppercase = {
            "email": "newuser@example.com",
            "user_name": "newuser",
            "password": "invalidpassword",
        }
        serializer = RegisterUserSerializer(data=data_no_uppercase)

        with self.assertRaisesMessage(
            ValidationError, "Password must contain at least one uppercase letter"
        ):
            serializer.is_valid(raise_exception=True)

        data_no_lowercase = {
            "email": "newuser@example.com",
            "user_name": "newuser",
            "password": "XXXXXXXXXXXXXXX",
        }
        serializer = RegisterUserSerializer(data=data_no_lowercase)

        with self.assertRaisesMessage(
            ValidationError, "Password must contain at least one lowercase letter"
        ):
            serializer.is_valid(raise_exception=True)

        data_no_digits = {
            "email": "newuser@example.com",
            "user_name": "newuser",
            "password": "No_digits",
        }

        serializer = RegisterUserSerializer(data=data_no_digits)

        with self.assertRaisesMessage(
            ValidationError, "Password must contain at least one digit"
        ):
            serializer.is_valid(raise_exception=True)
