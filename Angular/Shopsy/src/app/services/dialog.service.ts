import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../components/dialogs/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
 

  constructor(private dialog:
    MatDialog) { }
    openDialog(): Promise<boolean> {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '400px'
      });
  
      return dialogRef.afterClosed().toPromise();
    }
}
