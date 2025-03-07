
from django.db import models


class Admin(models.Model):
    user = models.OneToOneField('User', models.DO_NOTHING, db_column='User_id', primary_key=True)  # Field name made lowercase.
    help_count = models.IntegerField(db_column='Help_count', blank=True, null=True)  # Field name made lowercase.
    expertarea = models.TextField(db_column='Expertarea', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'admin'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class Blog(models.Model):
    blog_id = models.IntegerField(db_column='Blog_id', primary_key=True)  # Field name made lowercase.
    content = models.TextField(db_column='Content', blank=True, null=True)  # Field name made lowercase.
    topic = models.CharField(db_column='Topic', max_length=255, blank=True, null=True)  # Field name made lowercase.
    tag = models.CharField(db_column='Tag', max_length=255, blank=True, null=True)  # Field name made lowercase.
    writer = models.ForeignKey('User', models.DO_NOTHING, db_column='Writer_id', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'blog'


class Buyer(models.Model):
    buyer = models.OneToOneField('User', models.DO_NOTHING, db_column='Buyer_id', primary_key=True)  # Field name made lowercase.
    total_amount = models.DecimalField(db_column='Total_amount', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    rating = models.JSONField(db_column='Rating', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'buyer'


class Comment(models.Model):
    comment_id = models.IntegerField(db_column='Comment_id', primary_key=True)  # Field name made lowercase.
    comment_text = models.TextField(db_column='Comment_text', blank=True, null=True)  # Field name made lowercase.
    post = models.ForeignKey(Blog, models.DO_NOTHING, db_column='Post_id', blank=True, null=True)  # Field name made lowercase.
    user = models.ForeignKey('User', models.DO_NOTHING, db_column='User_id', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'comment'


class Conversations(models.Model):
    conv_id = models.IntegerField(db_column='Conv_id', primary_key=True)  # Field name made lowercase.
    created_time = models.DateTimeField(db_column='Created_time')  # Field name made lowercase.
    user_id_1 = models.ForeignKey('User', models.DO_NOTHING, db_column='User_id_1', blank=True, null=True)  # Field name made lowercase.
    user_id_2 = models.ForeignKey('User', models.DO_NOTHING, db_column='User_id_2', related_name='conversations_user_id_2_set', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'conversations'


class Crops(models.Model):
    crop_id = models.IntegerField(db_column='Crop_id', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=255, blank=True, null=True)  # Field name made lowercase.
    price_range = models.CharField(db_column='Price_range', max_length=255, blank=True, null=True)  # Field name made lowercase.
    soil_ph = models.DecimalField(db_column='Soil_ph', max_digits=4, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    day_light_needed = models.IntegerField(db_column='Day_light_needed', blank=True, null=True)  # Field name made lowercase.
    water_requirement = models.CharField(db_column='Water_requirement', max_length=255, blank=True, null=True)  # Field name made lowercase.
    maintenance_tips = models.TextField(db_column='Maintenance_tips', blank=True, null=True)  # Field name made lowercase.
    fertilizer_recommended = models.CharField(db_column='Fertilizer_recommended', max_length=255, blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'crops'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Farmer(models.Model):
    farmer = models.OneToOneField('User', models.DO_NOTHING, db_column='Farmer_id', primary_key=True)  # Field name made lowercase.
    land_size = models.DecimalField(db_column='Land_size', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    rating = models.JSONField(db_column='Rating', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'farmer'


class Labour(models.Model):
    labour = models.OneToOneField('User', models.DO_NOTHING, db_column='Labour_id', primary_key=True)  # Field name made lowercase.
    specialates = models.CharField(db_column='Specialates', max_length=255, blank=True, null=True)  # Field name made lowercase.
    preceable_time = models.DateTimeField(db_column='Preceable_time', blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=50, blank=True, null=True)  # Field name made lowercase.
    demand_fees = models.DecimalField(db_column='Demand_fees', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    rating = models.JSONField(db_column='Rating', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'labour'


class LabourHire(models.Model):
    hire_id = models.IntegerField(db_column='Hire_id', primary_key=True)  # Field name made lowercase.
    amount = models.DecimalField(db_column='Amount', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    start_date = models.DateField(db_column='Start_date', blank=True, null=True)  # Field name made lowercase.
    end_date = models.DateField(db_column='End_date', blank=True, null=True)  # Field name made lowercase.
    labour = models.ForeignKey(Labour, models.DO_NOTHING, db_column='Labour_id', blank=True, null=True)  # Field name made lowercase.
    farmer = models.ForeignKey(Farmer, models.DO_NOTHING, db_column='Farmer_id', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'labour_hire'


class Messages(models.Model):
    msg_id = models.IntegerField(db_column='Msg_id', primary_key=True)  # Field name made lowercase.
    conversation = models.ForeignKey(Conversations, models.DO_NOTHING, db_column='Conversation_id', blank=True, null=True)  # Field name made lowercase.
    sender = models.ForeignKey('User', models.DO_NOTHING, db_column='Sender_id', blank=True, null=True)  # Field name made lowercase.
    receiver = models.ForeignKey('User', models.DO_NOTHING, db_column='Receiver_id', related_name='messages_receiver_set', blank=True, null=True)  # Field name made lowercase.
    message = models.TextField(db_column='Message', blank=True, null=True)  # Field name made lowercase.
    time = models.DateTimeField(db_column='Time')  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'messages'


class Product(models.Model):
    product_id = models.IntegerField(db_column='Product_id', primary_key=True)  # Field name made lowercase.
    price = models.DecimalField(db_column='Price', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=255, blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.
    max_quantity = models.IntegerField(db_column='Max_quantity', blank=True, null=True)  # Field name made lowercase.
    seller = models.ForeignKey('User', models.DO_NOTHING, db_column='Seller_id', blank=True, null=True)  # Field name made lowercase.
    crop = models.ForeignKey(Crops, models.DO_NOTHING, db_column='Crop_id', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'product'


class ProductHistory(models.Model):
    history_id = models.IntegerField(db_column='History_id', primary_key=True)  # Field name made lowercase.
    product = models.ForeignKey(Product, models.DO_NOTHING, db_column='Product_id', blank=True, null=True)  # Field name made lowercase.
    buyer = models.ForeignKey(Buyer, models.DO_NOTHING, db_column='Buyer_id', blank=True, null=True)  # Field name made lowercase.
    seller = models.ForeignKey('User', models.DO_NOTHING, db_column='Seller_id', blank=True, null=True)  # Field name made lowercase.
    date_time = models.DateTimeField(db_column='Date_time')  # Field name made lowercase.
    quantity = models.IntegerField(db_column='Quantity', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'product_history'


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


class Seminar(models.Model):
    seminar_id = models.IntegerField(db_column='Seminar_id', primary_key=True)  # Field name made lowercase.
    start_date = models.DateField(db_column='Start_date', blank=True, null=True)  # Field name made lowercase.
    end_date = models.DateField(db_column='End_date', blank=True, null=True)  # Field name made lowercase.
    location = models.CharField(db_column='Location', max_length=255, blank=True, null=True)  # Field name made lowercase.
    title = models.CharField(db_column='Title', max_length=255, blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'seminar'


class StorehousesRental(models.Model):
    seminar_rental_id = models.IntegerField(db_column='Seminar_Rental_id', primary_key=True)  # Field name made lowercase.
    start_date = models.DateField(db_column='Start_date', blank=True, null=True)  # Field name made lowercase.
    end_date = models.DateField(db_column='End_date', blank=True, null=True)  # Field name made lowercase.
    rental_size = models.DecimalField(db_column='Rental_size', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    rent_price = models.DecimalField(db_column='Rent_price', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    storehouse = models.ForeignKey('Storehouses', models.DO_NOTHING, db_column='Storehouse_id', blank=True, null=True)  # Field name made lowercase.
    renter = models.ForeignKey('User', models.DO_NOTHING, db_column='Renter_id', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'seminar_rental'


class Storehouses(models.Model):
    storehouse_id = models.IntegerField(db_column='Storehouse_id', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=255, blank=True, null=True)  # Field name made lowercase.
    temperature_range = models.CharField(db_column='Temperature_range', max_length=255, blank=True, null=True)  # Field name made lowercase.
    location = models.CharField(db_column='Location', max_length=255, blank=True, null=True)  # Field name made lowercase.
    rent_per_sq = models.DecimalField(db_column='Rent_per_sq', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    owner = models.ForeignKey('User', models.DO_NOTHING, db_column='Owner_id', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'storehouses'


class Transaction(models.Model):
    transaction_id = models.IntegerField(db_column='Transaction_id', primary_key=True)  # Field name made lowercase.
    amount = models.DecimalField(db_column='Amount', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
    note = models.TextField(db_column='Note', blank=True, null=True)  # Field name made lowercase.
    receiver = models.ForeignKey('User', models.DO_NOTHING, db_column='Receiver_id', blank=True, null=True)  # Field name made lowercase.
    product = models.ForeignKey(Product, models.DO_NOTHING, db_column='Product_id', blank=True, null=True)  # Field name made lowercase.
    sender = models.ForeignKey('User', models.DO_NOTHING, db_column='Sender_id', related_name='transaction_sender_set', blank=True, null=True)  # Field name made lowercase.
    active = models.IntegerField(db_column='Active', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'transaction'




class User(models.Model):
    user_id = models.AutoField(db_column='User_id', primary_key=True)
    name = models.CharField(db_column='Name', max_length=255)
    image = models.ImageField(db_column='Image', upload_to='user_images/', blank=True, null=True)
    email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)
    password = models.CharField(db_column='Password', max_length=255)
    number = models.CharField(db_column='Number', max_length=15)
    type = models.CharField(db_column='Type', max_length=50, blank=True, null=True)
    region_id = models.IntegerField(db_column='Region_id', blank=True, null=True)
    active = models.IntegerField(db_column='Active', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'
