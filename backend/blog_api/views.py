from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets
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


class PostList(viewsets.ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    permission_classes = [PostUserWritePermission]
    serializer_class = PostSerializer
    queryset = Post.postobjects.all()

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get("pk")
        return get_object_or_404(Post, slug=item)

    def get_queryset(self):
        return Post.objects.all()
