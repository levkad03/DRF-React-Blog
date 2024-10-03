from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from blog.models import Category, Post
from users.models import NewUser


class PostTests(APITestCase):
    def test_view_posts(self):
        """
        Ensure we can view all objects.
        """
        url = reverse("blog_api:listcreate")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_account(self):
        """
        Ensure we can create a new Post object and view object.
        """
        self.test_category = Category.objects.create(name="django")

        self.test_user1 = NewUser.objects.create_user(
            email="testuser1@example.com",
            user_name="testuser1",
            first_name="Test",
            password="123456789",
        )
        self.client.login(username="test_user1", password="123456789")
        data = {
            "title": "new",
            "author": self.test_user1.id,
            "excerpt": "new",
            "content": "new",
        }
        url = reverse("blog_api:listcreate")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data), 6)
        root = reverse(("blog_api:detailcreate"), kwargs={"pk": 1})
        response = self.client.get(root, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_update(self):
        client = APIClient()
        self.test_category = Category.objects.create(name="django")
        self.testuser1 = NewUser.objects.create_user(
            email="testuser1@example.com",
            user_name="testuser1",
            first_name="Test1",
            password="123456789",
        )
        self.testuser2 = NewUser.objects.create_user(
            email="testuser2@example.com",
            user_name="testuser2",
            first_name="Test2",
            password="123456789",
        )
        test_post = Post.objects.create(
            category_id=1,
            title="Post Title",
            excerpt="Post Excerpt",
            content="Post Content",
            slug="post-title",
            author_id=self.testuser1.id,
            status="published",
        )

        client.login(username=self.testuser1, password="123456789")

        url = reverse(("blog_api:detailcreate"), kwargs={"pk": 1})

        response = client.put(
            url,
            {
                "title": "New",
                "author": 1,
                "excerpt": "New",
                "content": "New",
                "status": "published",
            },
            format="json",
        )
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
