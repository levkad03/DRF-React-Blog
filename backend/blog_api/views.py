from django.shortcuts import get_object_or_404
from rest_framework import filters, generics, viewsets
from rest_framework.permissions import (
    SAFE_METHODS,
    BasePermission,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from blog.models import Post

from .serializers import PostSerializer


class PostUserWritePermission(BasePermission):
    message = "Editing post is restricted to the author only."

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class PostList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer
    queryset = Post.postobjects.all()

    # def get_queryset(self):
    #     user = self.request.user
    #     return Post.objects.filter(author=user)


class PostDetail(generics.RetrieveAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    serializer_class = PostSerializer
    lookup_field = "slug"

    def get_object(self):
        slug = self.kwargs.get("slug", None)
        return get_object_or_404(Post, slug=slug)

    def get_queryset(self):
        slug = self.kwargs.get("slug", None)
        print(slug)
        return Post.objects.filter(slug=slug)


class PostListDetailfilter(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["^slug"]
