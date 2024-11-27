import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Account } from '../../../../../../models/account.model';
import { Transaction } from '../../../../../../models/transaction.model';
import { CurrencyPipe, NgFor, CommonModule, DatePipe} from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CurrencyPipe,NgFor,CommonModule, MatListModule, DatePipe],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnChanges{

  @Input() selectedAccount: Account | null = null;
  @Input() transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  activeFilter: string = 'day';

  ngOnChanges(): void {
      if(this.selectedAccount) {
        console.log("Zmiana konta: ", this.selectedAccount.name);
      } else {
        console.log("Jebło");
      }
      if (this.transactions.length > 0) {
          this.filteredTransactions = [...this.transactions];
          this.filterBy(this.activeFilter);
      }
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
  }

}
