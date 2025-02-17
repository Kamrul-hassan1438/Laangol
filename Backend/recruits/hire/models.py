from django.db import models



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


class User(models.Model):
    user_id = models.AutoField(db_column='User_id', primary_key=True)
    name = models.CharField(db_column='Name', max_length=255)
    image = models.ImageField(db_column='Image', upload_to='user_images/', blank=True, null=True)
    email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)
    password = models.CharField(db_column='Password', max_length=255)
    number = models.CharField(db_column='Number', max_length=15)
    type = models.CharField(db_column='Type', max_length=50, blank=True, null=True)
    region_id = models.ForeignKey(Region, db_column='Region_id', on_delete=models.SET_NULL, blank=True, null=True)

    active = models.IntegerField(db_column='Active', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'



class Labour(models.Model):
    labour_id = models.AutoField(primary_key=True, db_column='Labour_id')  # Primary key for Labour
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    specialates = models.TextField(db_column='Specialates', blank=True, null=True)
    preceable_time = models.DateTimeField(db_column='Preceable_time', blank=True, null=True)
    status = models.CharField(db_column='Status', max_length=50, blank=True, null=True)
    demand_fees = models.DecimalField(db_column='Demand_fees', max_digits=10, decimal_places=2, blank=True, null=True)
    rating = models.PositiveSmallIntegerField(db_column='Rating', blank=True, null=True)
    active = models.BooleanField(db_column='Active', default=True)
    experience = models.IntegerField(db_column='Experience', blank=True, null=True)

    class Meta:
        managed = False  # Set this to False if you're not using Django migrations to manage the database
        db_table = 'labour'



class LabourHire(models.Model):
    hire_id = models.AutoField(primary_key=True)  # Auto-incrementing primary key field
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Decimal for amount with max 10 digits and 2 decimal places
    start_date = models.DateField(null=True, blank=True)  # Date field for start date
    end_date = models.DateField(null=True, blank=True)  # Date field for end date
    labour = models.ForeignKey('Labour', on_delete=models.SET_NULL, null=True, blank=True)  # ForeignKey to Labour model, nullable
    hirer = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True)  # ForeignKey to hirer (DbUser), nullable
    active = models.BooleanField(default=True)  # Boolean for active status, default is True
    status = models.CharField(max_length=255, default='pending')  # Char field for status, default is 'pending'

    class Meta:
        db_table = 'labour_hire'  # Explicitly set the table name to match the SQL schema
        indexes = [
            models.Index(fields=['hirer']),  # Create an index for the hirer field
        ]

    def __str__(self):
        return f"Labour Hire {self.hire_id}"
