# Generated by Django 4.2.7 on 2024-09-21 16:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hire', '0007_alter_labourhire_options_labourhire_hirer_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='labourhire',
            options={},
        ),
        migrations.AlterField(
            model_name='labourhire',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='labourhire',
            name='amount',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='labourhire',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='labourhire',
            name='hire_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='labourhire',
            name='hirer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='hire.user'),
        ),
        migrations.AlterField(
            model_name='labourhire',
            name='labour',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='hire.labour'),
        ),
        migrations.AlterField(
            model_name='labourhire',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='labourhire',
            name='status',
            field=models.CharField(default='pending', max_length=255),
        ),
        migrations.AddIndex(
            model_name='labourhire',
            index=models.Index(fields=['hirer'], name='labour_hire_hirer_i_c96dd4_idx'),
        ),
    ]
