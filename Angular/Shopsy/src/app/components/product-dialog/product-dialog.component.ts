import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { fadeInAnimation } from 'animations'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
  animations: [fadeInAnimation] 
})
export class ProductDialogComponent {
 
  @Input() smallImages!: string[];
  @Input() title!: string;
  @Input() color!: string;
  @Input() mainImage!: string;
  @Input() id!:number;
  zoomedIn = false;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private overlay:Overlay,private router:Router
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  changeProductImage(event: any, imageUrl: string): void {
    this.data.mainImage = imageUrl;
  }
  toggleZoom() {
    this.zoomedIn = !this.zoomedIn;
  
  }

  
}
