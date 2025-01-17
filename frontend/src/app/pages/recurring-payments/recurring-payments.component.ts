import {Component, inject, OnInit} from '@angular/core';
import { Transaction} from '../../models/transaction.model';
import {TransactionService} from '../../services/transaction.service';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {
  UpdateRecurringPaymentDialogComponent
} from './update-recurring-payment-dialog/update-recurring-payment-dialog.component';

@Component({
  selector: 'app-recurring-payments',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatRadioButton,
    MatRadioGroup,
    FormsModule,
    DatePipe,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatIconButton,
    MatMenuTrigger
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

