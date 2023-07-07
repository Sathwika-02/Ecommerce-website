import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pincode-dialog',
  templateUrl: './pincode-dialog.component.html',
  styleUrls: ['./pincode-dialog.component.css']
})
export class PincodeDialogComponent {
  pincode: string='';

  constructor(
    public dialogRef: MatDialogRef<PincodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
