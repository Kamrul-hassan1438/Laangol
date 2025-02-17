from django.db import models

class KNNModel(models.Model):
    model_file = models.FileField(upload_to='models/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
