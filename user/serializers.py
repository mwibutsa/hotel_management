from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    """ Serialize the user model to and from JSON. """

    class Meta:
        model = get_user_model()
        fields = ('id',
                  'first_name',
                  'middle_name',
                  'last_name',
                  'username',
                  'email',
                  'password',
                  'is_admin',
                  'is_staff',
                  'is_landlord',
                  'is_superuser',
                  'is_active'
                  )

        read_only_fields = ('is_landlord', 'is_superuser')
        extra_kwargs = {
            'password': {
                'write_only': True
            },
        }

    def create(self, validated_data):
        """  Make sure the password is hashed during new user creation. """

        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)

        instance.save()

        return instance

    def update(self, instance, validated_data):
        """ Override the update method to make sure the password is hashed if changed. """

        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)

            else:
                setattr(instance, attr, value)

        instance.save()

        return instance


class AuthTokenSerializer(TokenObtainPairSerializer):
    """Serializer Token authentication to and from JSON. """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_admin'] = user.is_admin
        token['is_superuser'] = user.is_superuser

        return token
