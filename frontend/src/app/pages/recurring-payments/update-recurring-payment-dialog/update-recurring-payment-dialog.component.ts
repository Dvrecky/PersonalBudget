import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Transaction} from '../../../models/transaction.model';
import {HttpErrorResponse} from '@angular/common/http';
import {TransactionService} from '../../../services/transaction.service';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatOption, MatOptionModule} from '@angular/material/core';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatButton, MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-update-recurring-payment-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatDialogActions
  ],
  templateUrl: './update-recurring-payment-dialog.component.html',
  styleUrl: './update-recurring-payment-dialog.component.css'
})
export class UpdateRecurringPaymentDialogComponent implements OnInit {
  updateRecurringPaymentDialogData!: FormGroup;
  isRecurring: boolean = true;
  transaction!: Transaction;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private transactionService: TransactionService,
    protected dialogRef: MatDialogRef<UpdateRecurringPaymentDialogComponent>,
  )
  {
    this.transaction=data;
    this.updateRecurringPaymentDialogData = this.fb.group({
      recurring: [this.data.recurring],
      recurringPeriod: [this.data.recurringPeriod]
    })
  }

  ngOnInit() {
    this.updateRecurringPaymentDialogData.get('recurring')?.valueChanges.subscribe((value) => {
      if (value === 'true') {
        this.isRecurring = true;
        this.updateRecurringPaymentDialogData.get('recurringPeriod')?.setValue('weekly');
      } else {
        this.isRecurring = false;
        this.updateRecurringPaymentDialogData.get('recurringPeriod')?.setValue(null);
      }
    });
  }


  onTransactionUpdateConfirm() {
    if(this.updateRecurringPaymentDialogData.valid) {
      const updatedTransaction = this.transaction;
      updatedTransaction.recurring = this.updateRecurringPaymentDialogData.get('recurring')?.value;
      updatedTransaction.recurringPeriod = this.updateRecurringPaymentDialogData.get('recurringPeriod')?.value;

      console.log(updatedTransaction);
      this.transactionService.update(this.data.id, updatedTransaction).subscribe(() => {
          this.dialogRef.close('update');
        },

        (error: HttpErrorResponse) => {
          alert(error.message),
            this.dialogRef.close();
        }
      )
    }
    else {
      console.error("Invalid form")
    }
  }
}
