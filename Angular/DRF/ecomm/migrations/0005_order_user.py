# Generated by Django 4.2 on 2023-06-20 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecomm', '0004_rename_image_order_imageurl_rename_title_order_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='user',
            field=models.CharField(max_length=50, null=True),
        ),
    ]