from rest_framework import serializers

from blog.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            "category",
            "id",
            "title",
            "image",
            "author",
            "excerpt",
            "content",
            "status",
            "slug",
        )
