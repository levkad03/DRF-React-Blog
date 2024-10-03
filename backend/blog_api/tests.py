from io import BytesIO

from django.contrib.auth.models import User
from django.urls import reverse
from PIL import Image
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from blog.models import Category, Post
from users.models import NewUser


class PostTests(APITestCase):
    def setUp(self) -> None:
        # Set up test users and categories
        self.client = APIClient()

        self.test_category = Category.objects.create(name="django")

        self.test_user1 = NewUser.objects.create_user(
            email="testuser1@example.com",
            user_name="testuser1",
            first_name="Test",
            password="123456789",
        )

    def get_token(self, user):
        """Helper function to get JWT token for a user"""
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    def generate_image_file(self):
        """Helper function to generate an image file for testing"""
        file = BytesIO()
        image = Image.new("RGB", (100, 100), color="red")
        image.save(file, "jpeg")
        file.name = "test_image.jpg"
        file.seek(0)
        return file

    def test_create_account(self):
        """
        Ensure we can create a new Post object with multipart form data.
        """
        # Get the JWT token for authentication
        token = self.get_token(self.test_user1)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + token)

        # Prepare the data for creating a new post
        data = {
            "title": "new",
            "author": self.test_user1.id,
            "excerpt": "new",
            "content": "new",
            "category": self.test_category.id,
            "image": self.generate_image_file(),
            "slug": "new",
        }

        # Use the correct URL for the post creation endpoint
        url = reverse("blog_api:createpost")

        print(data)

        # Send the POST request with multipart form data
        response = self.client.post(url, data, format="multipart")

        print(response.data)

        # Check if the post was created successfully
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if we can retrieve the created post
        root = reverse("blog_api:detailcreate", kwargs={"slug": "new"})
        response = self.client.get(root, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
