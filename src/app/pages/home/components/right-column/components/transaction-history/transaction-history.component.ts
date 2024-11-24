import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Account } from '../../../../../../models/account.model';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [],
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

}
