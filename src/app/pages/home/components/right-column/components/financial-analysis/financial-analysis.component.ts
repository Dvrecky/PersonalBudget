import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { CurrencyPipe, CommonModule, JsonPipe } from '@angular/common';
import { Transaction } from '../../../../../../models/transaction.model';
import { Account } from '../../../../../../models/account.model';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-financial-analysis',
  standalone: true,
  providers: [NativeDateAdapter],
  imports: [CurrencyPipe, CommonModule,MatFormFieldModule,
    MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe, MatNativeDateModule],
  templateUrl: './financial-analysis.component.html',
  styleUrl: './financial-analysis.component.css'
})
export class FinancialAnalysisComponent implements OnChanges{

  @Input() selectedAccount: Account | null = null;
  @Input() transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  activeFilter: string = 'day';

  income: number = 0;
  expense: number = 0;
  balanceSheet: number = 0;

  readonly range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      });

 ngOnInit(): void {
     this.range.valueChanges.subscribe(value => {
       if (value.start && value.end) {
         this.activeFilter = "";
         this.filterByDateRange(new Date(value.start), new Date(value.end));
       }
     });
   }

 ngOnChanges(): void {
   console.log(this.transactions)
    if (this.transactions.length > 0) {
        this.filteredTransactions = [...this.transactions];
        this.filterBy(this.activeFilter);
    }

  this.range.reset();
       this.activeFilter = 'day';
       this.range.valueChanges.subscribe(value => {
            if (value.start && value.end) {
              this.filterByDateRange(value.start, value.end);
            }
          });
 }

  filterByDateRange(startDate: Date, endDate: Date) {
        this.filteredTransactions = this.transactions.filter(transaction =>
          transaction.date >= startDate && transaction.date <= endDate
        );
         this.income = this.filteredTransactions
            .filter(transaction => transaction.type === "income")
            .reduce((total, transaction) => total + transaction.amount, 0);

          this.expense = this.filteredTransactions
                  .filter(transaction => transaction.type === "expense")
                  .reduce((total, transaction) => total + transaction.amount, 0);

          this.balanceSheet = this.income - this.expense;
      }

  filterBy(period: string) {
    this.activeFilter = period;
    const now = new Date();
    switch(period) {
      case 'day':
          this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date.toDateString() === now.toDateString()});
        break;

      case 'week':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date >= startOfWeek && transaction.date <= endOfWeek;
          });
        break;

      case 'month':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date >= startOfMonth && transaction.date <= endOfMonth;
        });
        break;

      case 'year':
        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date.getFullYear() === now.getFullYear()
          });
        break;
    }

    this.income = this.filteredTransactions
      .filter(transaction => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    this.expense = this.filteredTransactions
            .filter(transaction => transaction.type === "expense")
            .reduce((total, transaction) => total + transaction.amount, 0);

    this.balanceSheet = this.income - this.expense;

  }


}
