import {Component, inject, OnInit} from '@angular/core';
import { Transaction} from '../../models/transaction.model';
import {TransactionService} from '../../services/transaction.service';
import { MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { MatMenuModule, } from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';

import {
  UpdateRecurringPaymentDialogComponent
} from './update-recurring-payment-dialog/update-recurring-payment-dialog.component';

@Component({
  selector: 'app-recurring-payments',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    DatePipe,
    MatIconModule,
    MatMenuModule,
    MatRadioModule
  ],
  templateUrl: './recurring-payments.component.html',
  styleUrl: './recurring-payments.component.css'
})
export class RecurringPaymentsComponent implements OnInit {

  recurringTransactions: Transaction[] = [];
  transactionType: string;
  readonly dialog = inject(MatDialog);

  constructor(private transactionService: TransactionService) {
    this.transactionType = "expense"
  }


  ngOnInit() {
   this.loadTransactions()
  }


  openUpdateRecurringTransactionDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number) {
    const transaction = this.recurringTransactions.find(c => c.id === id);
    const dialogRef = this.dialog.open(UpdateRecurringPaymentDialogComponent, {
      autoFocus: false,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: transaction
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'update') {
        this.loadTransactions();
      }
    })
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.recurringTransactions = transactions.filter(transaction => transaction.recurring);
    });
  }
}

