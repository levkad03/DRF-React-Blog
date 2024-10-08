from django.urls import path

from .views import BlacklistTokenView, CustomUserCreate, UpdateUserView

app_name = "users"

urlpatterns = [
    path("register/", CustomUserCreate.as_view(), name="create_user"),
    path("logout/blacklist/", BlacklistTokenView.as_view(), name="blacklist"),
    path("update/", UpdateUserView.as_view(), name="update_user"),
]
