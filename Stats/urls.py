from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth.views import LoginView, LogoutView
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetConfirmView
from dj_rest_auth.registration.views import RegisterView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('games.urls')), 
    # path('login/', LoginView.as_view(template_name='account/login.html'), name='login'),
    # path('accounts/login/', LoginView.as_view(), name='login'),
    path('logout/',LogoutView.as_view(), name='logout'),
    path('accounts/', include('allauth.urls')),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/login/', LoginView.as_view(), name='rest_login'),  # URL для входа через REST API
    path('api/auth/logout/', LogoutView.as_view(), name='rest_logout'),  # URL для выхода через REST API
    path('api/auth/password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),  # URL для сброса пароля через REST API
    path('api/auth/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),  # URL для подтверждения сброса пароля через REST API
    path('api/auth/registration/', RegisterView.as_view(), name='rest_register'),  # URL для регистрации через REST API
    path('auth/login/', LoginView.as_view(), name='login'),  # Обработка GET-запроса для страницы входа
    
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)