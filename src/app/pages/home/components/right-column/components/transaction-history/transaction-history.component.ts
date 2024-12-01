import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Transaction } from '../../../../../../models/transaction.model';
import { NgFor, CommonModule, DatePipe} from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

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
export class TransactionHistoryComponent implements OnChanges, OnInit {

  @Input() transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  activeFilter: string = 'day';

   readonly range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });

  ngOnInit(): void {
    console.log(this.transactions);
    this.range.valueChanges.subscribe(value => {
      if (value.start && value.end) {
        this.activeFilter = "";
        this.filterByDateRange(new Date(value.start), new Date(value.end));
      }
    });
  }

  ngOnChanges(): void {
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
        transaction.date.getDate() >= startDate.getDate() && transaction.date.getDate() <= endDate.getDate()
      );
    }

  filterBy(period: string) {
    this.range.reset();
    this.activeFilter = period;
    const now = new Date();
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
