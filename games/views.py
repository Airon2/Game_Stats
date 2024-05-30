from django.shortcuts import render, redirect
from steam import Steam
import os
from .models import Game,Profile
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from .forms import ProfileForm
from django.contrib import messages
from allauth.account.forms import LoginForm
from allauth.account.forms import SignupForm
from django.contrib.auth import get_user_model
from dotenv import load_dotenv
from rest_framework import viewsets
from .models import Profile, Game
from .serializers import ProfileSerializer, GameSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from django.shortcuts import render
from steam import Steam
from .models import Game, Profile
import os
from allauth.account.views import LoginView
from django.http import HttpResponse
load_dotenv()


def home(request):
    games = Game.objects.all()
    return render(request, 'base.html', {'games': games})


class CustomLoginView(LoginView):
    template_name = 'allauth/account/login.html'
    
@login_required
def game_detail(request, game_title):
    # Получаем информацию о игре из базы данных
    game = get_object_or_404(Game, title=game_title)
    
    # Проверяем, что у пользователя есть профиль
    try:
        profile = Profile.objects.get(user=request.user)
    except Profile.DoesNotExist:
        messages.error(request, 'Сначала создайте профиль, чтобы увидеть информацию о времени игры.')
        return redirect('login')  # Перенаправляем на страницу создания профиля или настройки профиля
    
    steam_id = profile.steamid
    
    # Получаем статистику игры из Steam API
    Steam_key = os.getenv("STEAM_API_KEY")
    steam = Steam(Steam_key)
    
    try:
        user_games = steam.users.get_owned_games(steam_id)
    except Exception as e:
        print("Ошибка при получении списка игр. Проверьте настройки конфиденциальности вашего аккаунта Steam.")
        user_games = None

    playtime_hours = None
    playtime_forever = None  # Инициализируем переменную здесь
    
    # Ищем игру с нужным названием в списке игр
    if user_games:
        games = user_games.get('games', [])
        for user_game in games:
            if user_game.get('name') == game_title:
                playtime_forever = user_game.get('playtime_forever', None)
                if playtime_forever is not None:
                    playtime_hours = round(playtime_forever / 60, 1)
                    break

    # Выводим результат
    if playtime_forever is not None:
        playtime_hours = round(playtime_forever / 60, 1)
        print(f"Время игры в {game_title}: {playtime_hours:.1f} часов")
    else:
        print(f"Игра {game_title} не найдена в списке игр пользователя.")

    # Передаем данные в шаблон HTML
    context = {
        'game': game,
        'playtime_hours': playtime_hours,
    }
    return render(request, 'game_detail.html', context)


def profile_detail(request):
    profile = Profile.objects.get(user=request.user)
    games = profile.games.all()  # Получаем список игр, связанных с профилем пользователя
    context = {
        'profile': profile,
        'games': games,
    }
    return render(request, 'profile/profile_base.html', context)

User = get_user_model()

from allauth.account.views import SignupView

class CustomSignupView(SignupView):
    template_name = 'registration/create_user.html'  

def login_view(request):
    if request.method == 'POST':
        # Обработка отправленной формы
        form = LoginForm(request.POST)
        if form.is_valid():
            # Действия при успешной авторизации
            return redirect('home')
    else:
        form = LoginForm()

    return render(request, 'templates/allauth/account/login.html', {'form': form})
from .forms import GameForm

def add_game_view(request):
    if request.method == 'POST':
        form = GameForm(request.POST, request.FILES)
        if form.is_valid():
            game = form.save()  # Сохраняем игру из формы

            # Проверяем, аутентифицирован ли пользователь
            if request.user.is_authenticated:
                user_profile = Profile.objects.get(user=request.user)
                user_profile.games.add(game)  # Добавляем новую игру к профилю пользователя

            return redirect('profile_detail')  # Перенаправляем на профиль после сохранения
    else:
        form = GameForm()
    
    return render(request, 'profile/add_game.html', {'form': form})


@login_required
def profile_settings(request):
    profile = get_object_or_404(Profile, user=request.user)
    games = profile.games.all()  # Получаем список игр, связанных с профилем пользователя

    # Получаем список всех игр, которые не добавлены в профиль пользователя
    available_games = Game.objects.exclude(pk__in=games.values_list('pk', flat=True))

    if request.method == 'POST':
        profile_form = ProfileForm(request.POST, request.FILES, instance=profile)
        if profile_form.is_valid():
            profile_form.save()
            messages.success(request, 'Профиль успешно обновлен.')
            return redirect('profile_settings')
        else:
            messages.error(request, 'Пожалуйста, исправьте ошибки в форме.')
    else:
        profile_form = ProfileForm(instance=profile)

    context = {
        'profile': profile,
        'profile_form': profile_form,
        'games': games,
        'available_games': available_games  # Добавляем список доступных игр в контекст
    }
    return render(request, 'profile/settings.html', context)

@login_required
def add_or_remove_game(request, game_id):
    profile = get_object_or_404(Profile, user=request.user)
    game = get_object_or_404(Game, pk=game_id)

    if request.method == 'POST':
        if game in profile.games.all():
            profile.games.remove(game)
            messages.success(request, f'Игра "{game.title}" удалена из профиля.')
        else:
            profile.games.add(game)
            messages.success(request, f'Игра "{game.title}" добавлена в профиль.')

        return redirect('profile_settings')  # Перенаправляем пользователя на страницу настроек профиля

    # Если это не POST-запрос или что-то еще, просто перенаправляем обратно на страницу профиля
    return redirect('profile_settings')

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]  # Добавляем разрешение IsAuthenticated

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    
class ProfileList(APIView):
    permission_classes = [IsAuthenticated]  # Устанавливаем разрешение на аутентифицированных пользователей

    def get(self, request):
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)
    
from django.http import JsonResponse

def profile_detail_api(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        games = list(profile.games.all().values())  # Получаем список игр, связанных с профилем пользователя
        games_with_details = []
        for game in games:
            game_detail = {
                'game_id': game['id'],
                'title': game['title'],
                'icon': game['icon'].url if game['icon'] else None,
                # Другие данные игры, которые вам нужны
            }
            games_with_details.append(game_detail)
        data = {
            'username': profile.user.username,
            'steamid': profile.steamid,
            'steam_url': profile.steam_url,
            'games': games_with_details,
        }
        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)
