# Generated by Django 4.2 on 2023-06-20 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecomm', '0009_alter_order_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='user',
            field=models.CharField(max_length=50, null=True),
        ),
    ]