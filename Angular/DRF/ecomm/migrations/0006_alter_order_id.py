# Generated by Django 4.2 on 2023-06-20 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecomm', '0005_order_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
