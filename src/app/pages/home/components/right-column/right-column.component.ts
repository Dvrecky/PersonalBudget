import { Component, OnInit } from '@angular/core';
import { Account } from '../../../../models/account.model';
import { Transaction } from '../../../../models/transaction.model';
import { AppStateService } from '../../../../services/app-state.service';
import { TransactionService } from '../../../../services/transaction.service';
import { TransactionHistoryComponent } from "./components/transaction-history/transaction-history.component";
import { FinancialAnalysisComponent} from "./components/financial-analysis/financial-analysis.component";

@Component({
  selector: 'app-right-column',
  standalone: true,
  imports: [TransactionHistoryComponent, FinancialAnalysisComponent],
  templateUrl: './right-column.component.html',
  styleUrl: './right-column.component.css'
})
export class RightColumnComponent implements OnInit{

  transactions: Transaction[] = [];
  selectedAccount: Account | null = null;

  constructor(private appStateService: AppStateService, private transactionService: TransactionService) {}

  ngOnInit(): void {
      this.appStateService.selectedAccount$.subscribe(account => {
      this.selectedAccount = account;
      console.log("Selected component in RightColumnComponent", account);

      if(account) {
        this.transactions = this.transactionService.getTransactionsByAccount(account);
      } else {
        this.transactions = [];
      }
    })
  }
}
