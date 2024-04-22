from django.contrib import admin
from allauth.socialaccount.models import SocialAccount, SocialApp, SocialToken
from allauth.account.models import EmailAddress

class SocialAccountAdmin(admin.ModelAdmin):
    list_display = ['user', 'provider']

class SocialAppAdmin(admin.ModelAdmin):
    list_display = ['provider', 'name', 'client_id']

class SocialTokenAdmin(admin.ModelAdmin):
    list_display = ['app', 'account', 'token', 'token_secret']

class EmailAddressAdmin(admin.ModelAdmin):
    list_display = ['user', 'email', 'verified']

admin.site.register(SocialAccount, SocialAccountAdmin)
admin.site.register(SocialApp, SocialAppAdmin)
admin.site.register(SocialToken, SocialTokenAdmin)
admin.site.register(EmailAddress, EmailAddressAdmin)
