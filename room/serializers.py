from rest_framework import serializers
from . import models


class RoomSerializer(serializers.ModelSerializer):
    room_category = serializers.SlugRelatedField(
        queryset=models.RoomCategory.objects.all(), slug_field='category_name'
    )

    class Meta:
        model = models.Room

        fields = (
            'id', 'room_number', 'room_status', 'created_at', 'updated_at', 'price', 'room_category'

        )

        read_only_fields = ('created_at', 'updated_at')

    def update(self, instance, validated_data):
        instance.room_number = validated_data.get(
            'room_number', instance.room_number)

        instance.room_status = validated_data.get(
            'room_status', instance.room_status)

        instance.room_category = validated_data.get(
            'room_category', instance.room_category)

        instance.price = validated_data.get(
            'price', instance.price)

        instance.save()
        return instance


class RoomCategorySerializer(serializers.ModelSerializer):
    rooms = RoomSerializer(many=True, read_only=True)

    class Meta:
        model = models.RoomCategory
        fields = (
            'id', 'category_name', 'rooms',
        )

        extra_kwargs = {
            'rooms': {
                'read_only': True
            }
        }
