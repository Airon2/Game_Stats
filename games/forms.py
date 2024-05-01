from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Game
from .models import Profile
from allauth.account.forms import SignupForm


class SignUpForm(SignupForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        
class GameForm(forms.ModelForm):
    class Meta:
        model = Game
        fields = ['title', 'game_id', 'icon']
        
from django import forms
from .models import Profile

class ProfileForm(forms.ModelForm):

    class Meta:
        model = Profile
        fields = ['steamid', 'nickname', 'avatar', 'steam_url']
        labels = {
            'steamid': 'Steam ID',
            'nickname': 'Nickname',
            'avatar': 'Avatar',
            'steam_url': 'Steam URL'
        }
        widgets = {
            'avatar': forms.FileInput(attrs={'accept': 'image/*'})  # Определяем, что это поле для изображений
        }

class AddGameToProfileForm(forms.Form):
    game = forms.ModelChoiceField(queryset=Game.objects.all(), label='Выберите игру')

    def __init__(self, user=None, *args, **kwargs):
        super(AddGameToProfileForm, self).__init__(*args, **kwargs)
        # Фильтруем список игр, исключая те, которые уже связаны с профилем пользователя
        if user:
            self.fields['game'].queryset = Game.objects.exclude(profiles__user=user)