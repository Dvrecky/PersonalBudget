import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Account } from '../../../../../../../models/account.model';
import { AccountService } from '../../../../../../../services/account.service';

@Component({
  selector: 'app-delete-account-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-account-dialog.component.html',
  styleUrl: './delete-account-dialog.component.css'
})
export class DeleteAccountDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Account, private accountService: AccountService){}

  deleteAccount(accId: number) {
    this.accountService.deleteAccount(accId);
    console.log(this.accountService.getAccounts());
  }
}
