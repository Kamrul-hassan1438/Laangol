# Generated by Django 4.2.7 on 2024-09-16 15:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('verify', '0002_expiringtoken'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ExpiringToken',
        ),
    ]
