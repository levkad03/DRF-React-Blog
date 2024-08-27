# from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import PostDetail, PostList, PostListDetailfilter

app_name = "blog_api"

# router = DefaultRouter()
# router.register('', PostList, basename='post')
# urlpatterns = router.urls

urlpatterns = [
    path("posts/<str:slug>/", PostDetail.as_view(), name="detailcreate"),
    path("search/", PostListDetailfilter.as_view(), name="postsearch"),
    path("", PostList.as_view(), name="listcreate"),
]
