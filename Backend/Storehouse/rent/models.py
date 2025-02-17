from django.db import models

class User(models.Model):
    user_id = models.AutoField(db_column='User_id', primary_key=True)
    name = models.CharField(db_column='Name', max_length=255)
    email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)
    password = models.CharField(db_column='Password', max_length=255)
    number = models.CharField(db_column='Number', max_length=15)
    type = models.CharField(db_column='Type', max_length=50, blank=True, null=True)
    region = models.ForeignKey('Region', models.DO_NOTHING, db_column='Region_id', blank=True, null=True)  # Changed to ForeignKey
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

class Storehouses(models.Model):
    storehouse_id = models.AutoField(db_column='Storehouse_id', primary_key=True)
    name = models.CharField(db_column='Name', max_length=255, blank=True, null=True)
    temperature_range = models.CharField(db_column='Temperature_range', max_length=255, blank=True, null=True)
    location = models.CharField(db_column='Location', max_length=255, blank=True, null=True)
    rent_per_sq = models.DecimalField(db_column='Rent_per_sq', max_digits=10, decimal_places=2, blank=True, null=True)
    total_size = models.DecimalField(db_column='Total_size', max_digits=10, decimal_places=2, blank=True, null=True)
    owner = models.ForeignKey('User', models.DO_NOTHING, db_column='Owner_id', blank=True, null=True)
    active = models.IntegerField(db_column='Active', blank=True, null=True)
    status = models.CharField(db_column='Status', max_length=50, default='Available')
    descriptions = models.TextField(db_column='Descriptions', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'storehouses'



class StorehousesRental(models.Model):
    rental_id = models.IntegerField(db_column='Rental_id', primary_key=True)  # Primary key
    start_date = models.DateField(db_column='Start_date', blank=True, null=True)
    end_date = models.DateField(db_column='End_date', blank=True, null=True)
    rental_size = models.DecimalField(db_column='Rental_size', max_digits=10, decimal_places=2, blank=True, null=True)
    rent_price = models.DecimalField(db_column='Rent_price', max_digits=10, decimal_places=2, blank=True, null=True)
    storehouse = models.ForeignKey('Storehouses', models.DO_NOTHING, db_column='Storehouse_id', blank=True, null=True)
    renter = models.ForeignKey('User', models.DO_NOTHING, db_column='Renter_id', blank=True, null=True)
    active = models.IntegerField(db_column='Active', blank=True, null=True)
    status = models.CharField(max_length=20, default='pending')  # Default status field

    class Meta:
        managed = False
        db_table = 'storehousesRental'
