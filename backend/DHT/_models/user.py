from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager, PermissionsMixin

class CustomUserManager(UserManager):
    def _create_user(self, email, password, groups=None, user_permissions=None, **extra_fields):
        if not email:
            raise ValueError('You have not provided a valid e-mail')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if groups: user.groups.set(groups)
        if user_permissions: user.permissions.set(user_permissions)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_user( self, email = None, password = None, groups=None, user_permissions=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, groups, user_permissions, **extra_fields)
    
    def create_superuser( self, email = None, password = None, groups=None, user_permissions=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, groups, user_permissions, **extra_fields)
    
    def update_user( self, instance, groups=None, user_permissions=None, **extra_fields):
        for attr, value in extra_fields.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        if groups is not None:
            instance.groups.set(groups)
        if user_permissions is not None:
            instance.permissions.set(user_permissions)
        return instance
    

class User(AbstractUser, PermissionsMixin):
    ROLES = (
        ('ADMIN', 'ADMIN'),
        ('OPERATOR', 'OPERATOR')
    )
    LEVELS = (
        (0, 'None'),
        (1, 'LEVEL 1'),
        (2, 'LEVEL 2'),
        (3, 'LEVEL 3'),
    )
    username = models.CharField(max_length=150, unique=False, blank=True, null=True)
    email = models.EmailField(blank=True, default='', unique=True)
    roles = models.CharField(max_length=50, choices = ROLES, null=True)
    level = models.SmallIntegerField(blank=True, choices=LEVELS, default=1)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()