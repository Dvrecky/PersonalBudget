import { Component, OnInit } from '@angular/core';
import { Account } from '../../../../models/account.model';
import { AppStateService } from '../../../../services/app-state.service';
import { TransactionHistoryComponent } from "./components/transaction-history/transaction-history.component";

@Component({
  selector: 'app-right-column',
  standalone: true,
  imports: [TransactionHistoryComponent],
  templateUrl: './right-column.component.html',
  styleUrl: './right-column.component.css'
})
export class RightColumnComponent implements OnInit{

  selectedAccount: Account | null = null;

  constructor(private appStateService: AppStateService) {}

  ngOnInit(): void {
      this.appStateService.selectedAccount$.subscribe(account => {
        this.selectedAccount = account;
        console.log("Selected component in RightColumnComponent", account);
      })
  }
}
