import { Component, Inject} from '@angular/core';
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
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './update-transaction-dialog.component.html',
  styleUrl: './update-transaction-dialog.component.css'
})
export class UpdateTransactionDialogComponent {
  transaction: Transaction;
  updateTransactionForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService,
    protected dialogRef: MatDialogRef<UpdateTransactionDialogComponent>,
    private fb: FormBuilder
  ) {
    this.transaction = data.transaction;

    this.updateTransactionForm = this.fb.group({
      type: [this.transaction.type],
      accountId: [this.transaction.accountId],
      amount: [this.transaction.amount, Validators.min(0.01)],
      description: [this.transaction.description, [Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-z0-9 ]+$')]],
      categoryId: [this.transaction.categoryId],
      date: [this.transaction.date],
    })
  }

  onTransactionUpdateConfirm() {
    if (this.updateTransactionForm.valid) {
      const updatedTransactionData: Transaction = this.updateTransactionForm.value;
      console.log(updatedTransactionData);

      const selectedDate = updatedTransactionData.date;
      const utcDate = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        )
      );
      updatedTransactionData.date = utcDate;

      this.transactionService.update(this.transaction.id, updatedTransactionData).subscribe(() => {
          this.dialogRef.close('updated');
        },
        (error: HttpErrorResponse) => {
          alert(error.message),
            this.dialogRef.close();
        }
      );
    }
    else {
      console.error("Invalid from")
    }
  }
}
