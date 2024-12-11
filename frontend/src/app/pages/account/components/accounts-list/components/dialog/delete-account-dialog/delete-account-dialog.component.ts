import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Account } from '../../../../../../../models/account.model';
import { AccountService } from '../../../../../../../services/account.service';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-account-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-account-dialog.component.html',
  styleUrl: './delete-account-dialog.component.css'
})
export class DeleteAccountDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Account, private accountService: AccountService){}

  deleteAccount(accId: number): void {
    this.accountService.deleteAccount(accId).subscribe(
      (response: void) => {
        console.log(response)
      },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
    );
  }
}
