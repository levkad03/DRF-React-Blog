from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.test import TestCase


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
