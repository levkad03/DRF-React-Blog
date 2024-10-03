from django.contrib.auth.models import User
from django.test import TestCase

from users.models import NewUser

from .models import Category, Post


class TestCreatePost(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_category = Category.objects.create(name="django")
        test_user1 = NewUser.objects.create_user(
            email="testuser1@example.com",
            user_name="test_user1",
            first_name="Test",
            password="123456789",
        )

        test_post = Post.objects.create(
            category_id=1,
            title="Post Title",
            excerpt="Post Excerpt",
            content="Post Content",
            slug="post-title",
            author_id=test_user1.id,
            status="published",
        )

    def test_blog_content(self):
        post = Post.postobjects.get(id=1)
        cat = Category.objects.get(id=1)
        author = f"{post.author}"
        excerpt = f"{post.excerpt}"
        title = f"{post.title}"
        content = f"{post.content}"
        status = f"{post.status}"

        self.assertEqual(author, "test_user1")
        self.assertEqual(title, "Post Title")
        self.assertEqual(content, "Post Content")
        self.assertEqual(status, "published")
        self.assertEqual(excerpt, "Post Excerpt")
        self.assertEqual(str(post), "Post Title")
        self.assertEqual(str(cat), "django")
