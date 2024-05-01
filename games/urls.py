from django.contrib import admin
from django.urls import path, include
from . import views
from django.contrib.auth.views import LoginView, LogoutView
from allauth.account.views import SignupView
from .views import CustomSignupView
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
]

from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)