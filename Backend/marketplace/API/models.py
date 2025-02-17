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
    email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)
    password = models.CharField(db_column='Password', max_length=255)
    number = models.CharField(db_column='Number', max_length=15)
    type = models.CharField(db_column='Type', max_length=50, blank=True, null=True)
    region_id = models.ForeignKey(Region, db_column='Region_id', related_name='users', on_delete=models.SET_NULL, blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)

    active = models.IntegerField(db_column='Active', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Accessories', 'Accessories'),
        ('Vegetables', 'Vegetables'),
        ('Fertilizers', 'Fertilizers'),
    ]

    product_id = models.AutoField(primary_key=True)
    price = models.DecimalField(db_column='Price', max_digits=10, decimal_places=2, blank=True, null=True)
    name = models.CharField(db_column='Name', max_length=255, blank=True, null=True)
    description = models.TextField(db_column='Description', blank=True, null=True)
    max_quantity = models.IntegerField(db_column='Max_quantity', blank=True, null=True)
    seller = models.ForeignKey('User', models.DO_NOTHING, db_column='Seller_id', blank=True, null=True)
    active = models.IntegerField(db_column='Active', blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    category = models.CharField(db_column='Category', max_length=50, choices=CATEGORY_CHOICES, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product'

    def save(self, *args, **kwargs):
        if not self.product_id:
            last_product = Product.objects.order_by('-product_id').first()
            if last_product:
                self.product_id = last_product.product_id + 1
            else:
                self.product_id = 5000  
        super(Product, self).save(*args, **kwargs)


class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Pending')  # 'Pending', 'Checked Out', etc.

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=100)
    shipping_address = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default='Order Placed')  # 'Order Placed', 'Shipped', etc.
    placed_at = models.DateTimeField(auto_now_add=True)
