import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../../../../../../../models/account.model';
import { AccountService } from '../../../../../../../services/account.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-account-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './update-account-dialog.component.html',
  styleUrl: './update-account-dialog.component.css'
})
export class UpdateAccountDialogComponent {

  readonly dialogRef = inject(MatDialogRef<UpdateAccountDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Account, private accountService: AccountService){}

  updateAccount(){

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
