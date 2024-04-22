from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    steamid = models.CharField(max_length=17)
    nickname = models.CharField(max_length=20)
    avatar = models.ImageField(blank=True, null=True)
    steam_url = models.CharField(max_length=100, blank=True, null=True)
    games = models.ManyToManyField('Game', related_name='profiles', blank=True)

    def __str__(self):
        return f'{self.user.username}\'s profile'

class Game(models.Model):
    title = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='icons/')
    game_id = models.CharField(max_length=17)
    
    
    def __str__(self):
        return self.title


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
