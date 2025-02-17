from django.db import models

class User(models.Model):
    user_id = models.AutoField(db_column='User_id', primary_key=True)
    name = models.CharField(db_column='Name', max_length=255)
    email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)
    password = models.CharField(db_column='Password', max_length=255)
    number = models.CharField(db_column='Number', max_length=15)
    type = models.CharField(db_column='Type', max_length=50, blank=True, null=True)
    region = models.ForeignKey('Region', db_column='Region_id', on_delete=models.SET_NULL, blank=True, null=True)  # Establishing relationship with Region model
    active = models.IntegerField(db_column='Active', blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'user'



class Region(models.Model):
    region_id = models.IntegerField(db_column='Region_id', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=255, blank=True, null=True)  # Field name made lowercase.
    soil_ph = models.DecimalField(db_column='Soil_ph', max_digits=4, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    water_availability = models.CharField(db_column='Water_availability', max_length=255, blank=True, null=True)  # Field name made lowercase.
    humidity = models.CharField(db_column='Humidity', max_length=255, blank=True, null=True)  # Field name made lowercase.
    day_light = models.CharField(db_column='Day_light', max_length=255, blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'region'
