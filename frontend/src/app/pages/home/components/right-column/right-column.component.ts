import { Component, OnInit } from '@angular/core';
import { Account } from '../../../../models/account.model';
import { Transaction } from '../../../../models/transaction.model';
import { AppStateService } from '../../../../services/app-state.service';
import { TransactionService } from '../../../../services/transaction.service';
import { TransactionHistoryComponent } from "./components/transaction-history/transaction-history.component";
import { FinancialAnalysisComponent} from "./components/financial-analysis/financial-analysis.component";
import {AccountService} from '../../../../services/account.service';

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
  accounts: Account[] = [];

  constructor(private appStateService: AppStateService, private transactionService: TransactionService, private accountService: AccountService) {}

  ngOnInit(): void {
      this.appStateService.selectedAccount$.subscribe(account => {
      this.selectedAccount = account;
      console.log("elo" + this.selectedAccount?.name);
      if(account) {

        if(account?.id === 0) { //account === suma
          this.transactionService.getTransactions().subscribe(transactions => {
            this.transactions = transactions;
          });
        }
        else {
          this.transactionService.getTransactionsByAccount(account).subscribe(transactions => {
            this.transactions = transactions;
          });
        }
      } else {
        this.transactions = [];
      }
    })
    this.accountService.getAccounts().subscribe(accounts => {this.accounts = accounts;});
  }
}
