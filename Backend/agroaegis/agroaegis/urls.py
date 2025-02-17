from django.contrib import admin
from django.urls import path
from Chatbot.views import ChatbotInteractionView,ChatbotInteractionHistoryView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chatbot/', ChatbotInteractionView.as_view(), name='chatbot-interaction'),
    path('chat-history/', ChatbotInteractionHistoryView.as_view(), name='chatbot-history'),
]
