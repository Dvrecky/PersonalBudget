import { Component } from '@angular/core';
import { AccountBudgetComponent } from "./components/account-budget/account-budget.component";
import { Account } from '../../../../models/account.model';
import { AccountService } from '../../../../services/account.service';
import { OnInit } from '@angular/core';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { AppStateService } from '../../../../services/app-state.service';
import { SwitchTransactionTypeComponent } from "./components/switch-transaction-type/switch-transaction-type.component";
import { CategoryChartComponent } from "./components/category-chart/category-chart.component";

@Component({
  selector: 'app-left-column',
  standalone: true,
  imports: [AccountBudgetComponent, SwitchTransactionTypeComponent, CategoryChartComponent],
  templateUrl: './left-column.component.html',
  styleUrl: './left-column.component.css'
})
export class LeftColumnComponent implements OnInit{

  accountsList: Account[] = [];

  selectedAccountId: number = 0;

  selectedTransactionType: 'expenses' | 'incomes' = 'expenses';

  constructor(private accountService: AccountService, private appStateService: AppStateService) {
  }

  ngOnInit(): void {
    // this.loadAccounts();
    this.accountsList = this.accountService.getAccounts();
    const total = this.accountsList.reduce( (accumulator, currentIndex) => (accumulator + currentIndex.balance) , 0);
    const accSum: Account = {id:0, name: "Suma", balance: total};


    this.accountsList.splice(0, 0, accSum);
    this.appStateService.setSelectedAccount(this.accountsList[0]);
  }

  onAccountChange(accountId: number) {
    this.selectedAccountId = accountId;
    console.log("Parent: ", accountId);
    const account = this.accountsList.find(acc => acc.id === accountId);
    if (account) {
      this.appStateService.setSelectedAccount(account); // Prześlij obiekt do AppStateService
    }
  }

  changeTransactionType(value: 'expenses' | 'incomes') {
    console.log("Było: ", this.selectedTransactionType);
    this.selectedTransactionType = value;
    console.log("Jest: ", this.selectedTransactionType);
  }

  onPeriodChange(period: "year" | "month" | "week" | "day") {
      console.log(period);
  }

  // rodzic będzie odpowiedzialny za wygenerowanie poprawnych danych do wyświetlenia wykresu
  // na podstawie danych przekazanych z CategoryChartCOmponent (okres) oraz SwitchTransactionComponent (typ transakcji)
  // i za przekazanie ich do CategoryChartComponent, aby wyświetlić odpowiedni wykres

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
