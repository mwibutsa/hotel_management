from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin


class UserManager(BaseUserManager):
    """ A class to provide helper functions for managing user model. """

    def create_user(self, email, password=None, **kwargs):
        """Create normal user """

        if not email:
            raise ValueError('User should have an email address')

        if not password:
            raise ValueError('User should have a password')

        user = self.model(email=self.normalize_email(
            email), **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **kwargs):
        """ Create super user. """

        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)

        return user

    def create_landlord(self, email, password, **kwargs):
        user = self.create_superuser(email, password, **kwargs)
        user.is_landlord = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """ User table model """

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(unique=True, max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    is_admin = models.BooleanField(default=False)
    is_landlord = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    objects = UserManager()
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
