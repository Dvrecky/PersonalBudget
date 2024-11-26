import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Account } from '../../../../../../models/account.model';
import { CurrencyPipe, NgFor, CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CurrencyPipe,NgFor,CommonModule, MatListModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnChanges{

  @Input() selectedAccount: Account | null = null;

  ngOnChanges(): void {
      if(this.selectedAccount) {
        console.log("Zmiana konta: ", this.selectedAccount.name);
      } else {
        console.log("Jebło");
      }
  }

   transactions = [
      { date: '2024-11-25', description: 'Zakupy spożywcze', amount: 150.0, type : 'expense'},
      { date: '2024-11-24', description: 'Wypłata', amount: 5000.0, type : 'income'},
      { date: '2024-11-23', description: 'Przelew oo znajomego', amount: 200.0, type : 'income'},
      { date: '2024-11-22', description: 'Opłata za rachunki', amount: 450.0, type : 'expense' },
      { date: '2024-11-21', description: 'Obiad w restauracji', amount: 80.0, type : 'expense'},
      { date: '2024-11-25', description: 'Zakupy spożywcze', amount: 150.0, type : 'expense'},
      { date: '2024-11-24', description: 'Wypłata', amount: 5000.0, type : 'income'},
      { date: '2024-11-23', description: 'Przelew do znajomego', amount: 200.0, type : 'expense' },
      { date: '2024-11-22', description: 'Opłata za rachunki', amount: 450.0, type : 'expense' },
      { date: '2024-11-21', description: 'Obiad w restauracji', amount: 80.0, type : 'expense' },
    ];

  filterBy(period: string) {
    console.log(`Filtruj dla okresu: ${period}`);
    // Logika filtrowania transakcji w zależności od wybranego okresu.
  }

}
