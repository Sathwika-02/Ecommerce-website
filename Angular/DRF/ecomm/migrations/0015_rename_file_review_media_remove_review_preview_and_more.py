# Generated by Django 4.2 on 2023-06-23 14:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecomm', '0014_remove_review_productid_review_product'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='file',
            new_name='media',
        ),
        migrations.RemoveField(
            model_name='review',
            name='preview',
        ),
        migrations.AlterField(
            model_name='review',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='ecomm.product'),
        ),
    ]
