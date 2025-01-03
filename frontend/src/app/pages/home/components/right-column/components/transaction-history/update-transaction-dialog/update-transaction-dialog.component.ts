import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';
import {TransactionService} from '../../../../../../../services/transaction.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Transaction} from '../../../../../../../models/transaction.model';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-update-transaction-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatButton
  ],
  templateUrl: './update-transaction-dialog.component.html',
  styleUrl: './update-transaction-dialog.component.css'
})
export class UpdateTransactionDialogComponent {
  transaction: Transaction;
  updatedTransaction: Transaction;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService,
    protected dialogRef: MatDialogRef<UpdateTransactionDialogComponent>,
  ) {
    this.transaction = data.transaction;
    this.updatedTransaction = {...this.transaction};
  }

  updateTransaction() {

    const selectedDate = this.updatedTransaction.date;
    const utcDate = new Date(Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      )
    );
    this.updatedTransaction.date = utcDate;
    console.log(this.updatedTransaction);

    this.transactionService.update(this.updatedTransaction).subscribe(() => {
        this.dialogRef.close('updated');
      },
      (error: HttpErrorResponse) => {
        alert(error.message),
          this.dialogRef.close();
      }
    );
  }
}
