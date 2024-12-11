import { ChangeDetectionStrategy, Component, Input, OnChanges,OnDestroy } from '@angular/core';
import { Transaction } from '../../../../../../models/transaction.model';
import { NgFor, CommonModule, DatePipe} from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  providers: [NativeDateAdapter],
  imports: [NgFor,CommonModule, MatListModule, DatePipe, MatFormFieldModule,
    MatDatepickerModule, FormsModule, ReactiveFormsModule, MatNativeDateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnChanges,OnDestroy {

  @Input() transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  activeFilter: string = 'day';
  private rangeSubscription: Subscription | undefined;

  readonly range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
  });


  ngOnChanges(): void {
    this.filteredTransactions = [];

    //dodac oblsuge bledu
    // if (!this.transactions || this.transactions.length === 0) {
    //   return;
    // }

    this.activeFilter = 'day';
    this.filteredTransactions = [...this.transactions];
    this.filterBy(this.activeFilter);

     this.range.valueChanges.subscribe(value => {
        if (value.start && value.end) {
          this.activeFilter = "";
          this.filterByDateRange(new Date(value.start), new Date(value.end));
        }
     });
    }

  ngOnDestroy(): void {
    if (this.rangeSubscription) {
      this.rangeSubscription.unsubscribe();
    }
  }

  filterByDateRange(startDate: Date, endDate: Date) {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = transaction.date;
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    }

  filterBy(period: string) {
    this.range.reset();
    this.activeFilter = period;
    const now = new Date();
    now.setHours(0,0,0,0);
    switch(period) {
      case 'day':
        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date.toDateString() === now.toDateString()});
        break;

      case 'week':
        const startOfWeek = new Date(now);
        const dayOfWeek = startOfWeek.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date >= startOfWeek && transaction.date < endOfWeek;
          });
        break;

      case 'month':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date >= startOfMonth && transaction.date < endOfMonth;
        });
        break;

      case 'year':
        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date.getFullYear() === now.getFullYear()
          });
        break;
    }
  }

}
