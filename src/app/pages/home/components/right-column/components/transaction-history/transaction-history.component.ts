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

  ngOnChanges(): void {
      if(this.selectedAccount) {
        console.log("Zmiana konta: ", this.selectedAccount.name);
      } else {
        console.log("Jebło");
      }
    }


  filterBy(period: string) {
    console.log(`Filtruj dla okresu: ${period}`);
    // Logika filtrowania transakcji w zależności od wybranego okresu.
  }

}
