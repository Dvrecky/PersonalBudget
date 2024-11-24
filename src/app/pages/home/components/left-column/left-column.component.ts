import { Component } from '@angular/core';
import { AccountBudgetComponent } from "./components/account-budget/account-budget.component";
import { Account } from '../../../../models/account.model';
import { AccountService } from '../../../../services/account.service';
import { OnInit } from '@angular/core';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { AppStateService } from '../../../../services/app-state.service';

@Component({
  selector: 'app-left-column',
  standalone: true,
  imports: [AccountBudgetComponent],
  templateUrl: './left-column.component.html',
  styleUrl: './left-column.component.css'
})
export class LeftColumnComponent implements OnInit{

  accountsList: Account[] = [
    { id: 1, name: "Konto główne", balance: 1000},
    { id: 2, name: 'Oszczędnościowe', balance: 5000 },
    { id: 3, name: 'Karta kredytowa', balance: 300 },
  ];

  selectedAccountId: number = 0;

  constructor(private accontService: AccountService, private appStateService: AppStateService) {
  }

  ngOnInit(): void {
    // this.loadAccounts();
    const total = this.accountsList.reduce( (accumulator, currentIndex) => (accumulator + currentIndex.balance) , 0);
    const accSum: Account = {id:0, name: "Suma", balance: total};
    this.accountsList.splice(0, 0, accSum);
  }

  onAccountChange(accountId: number) {
    this.selectedAccountId = accountId;
    console.log("Parent: ", accountId);
    const account = this.accountsList.find(acc => acc.id === accountId);
    if (account) {
      this.appStateService.setSelectedAccount(account); // Prześlij obiekt do AppStateService
    }
  }

  // loadAccounts(): void {
  //   this.accontService.getAccounts().subscribe(
  //     (response: Account[]) => {
  //       this.accountsList = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }
}
