import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {TransactionService} from '../../../../../../../services/transaction.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-delete-transaction-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    DatePipe
  ],
  templateUrl: './delete-transaction-dialog.component.html',
  styleUrl: './delete-transaction-dialog.component.css'
})
export class DeleteTransactionDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService,
    protected dialogRef: MatDialogRef<DeleteTransactionDialogComponent>
  ) {}

  deleteTransaction(accountId: Number): void {
    this.transactionService.delete(accountId).subscribe( () => {
      this.dialogRef.close('deleted');
      },
      (error: HttpErrorResponse) => {
        alert(error.message),
        this.dialogRef.close();
      }
    );
  }
}
