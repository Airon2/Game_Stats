# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Game

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'steamid', 'nickname', 'avatar', 'steam_url', 'games']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'title', 'icon', 'game_id']
