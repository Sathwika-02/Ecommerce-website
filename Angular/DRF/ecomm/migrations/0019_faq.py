# Generated by Django 4.2 on 2023-06-27 04:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecomm', '0018_product_delivery_day'),
    ]

    operations = [
        migrations.CreateModel(
            name='Faq',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_title', models.CharField(max_length=100, null=True)),
                ('question', models.CharField(max_length=255)),
                ('answer', models.TextField()),
                ('status', models.CharField(default='pending', max_length=20)),
            ],
        ),
    ]
