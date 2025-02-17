from rest_framework import serializers
from .models import ChatbotInteraction

class ChatbotInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatbotInteraction
        fields = ['question', 'response', 'question_time']
        read_only_fields = ['question_time']
