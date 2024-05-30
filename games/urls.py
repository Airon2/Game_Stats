from django.contrib import admin
from django.urls import path, include
from . import views
from django.contrib.auth.views import LoginView, LogoutView
from allauth.account.views import SignupView
from .views import CustomSignupView
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, GameViewSet
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetConfirmView
from dj_rest_auth.registration.views import RegisterView

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)
router.register(r'games', GameViewSet)

urlpatterns = [
    path('', views.home, name='home'),
    path('game/<str:game_title>/', views.game_detail, name='game-detail'),
    path('profile/', views.profile_detail, name='profile_detail'),
    
    # path('signup/', views.signup_view, name='create_user'),
    # path('accounts/signup/', views.signup_view, name='create_user'),
    path('accounts/signup/', CustomSignupView.as_view(), name='create_user'),
    # path('login/', LoginView.as_view(template_name='account/login.html'), name='login'),
    path('accounts/login/', LoginView.as_view(), name='login'),
    path('logout/',LogoutView.as_view(), name='logout'),
    path('accounts/', include('allauth.urls')),
    path('accounts/', include('allauth.socialaccount.urls')),
    
    path('add_game/', views.add_game_view, name='add_game'),
    path('add_or_remove_game/<int:game_id>/', views.add_or_remove_game, name='add_or_remove_game'),
    path('profile/settings/', views.profile_settings, name='profile_settings'),
    
    path('api/', include(router.urls)),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/login/', LoginView.as_view(), name='rest_login'),  # URL для входа через REST API
    path('api/auth/logout/', LogoutView.as_view(), name='rest_logout'),  # URL для выхода через REST API
    path('api/auth/password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),  # URL для сброса пароля через REST API
    path('api/auth/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),  # URL для подтверждения сброса пароля через REST API
    path('api/auth/registration/', RegisterView.as_view(), name='rest_register'),  # URL для регистрации через REST API
    path('api/auth/user/', include('dj_rest_auth.urls')),  # URL для получения текущего пользователя через REST API
]

from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)