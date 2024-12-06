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
import { CategoryChart } from '../../../../models/categoryChart.model';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';
import { TransactionService } from '../../../../services/transaction.service';

import { Chart, registerables } from 'chart.js';
import { transition } from '@angular/animations';
import { withHttpTransferCacheOptions } from '@angular/platform-browser';
Chart.register(...registerables);

@Component({
  selector: 'app-left-column',
  standalone: true,
  imports: [AccountBudgetComponent, SwitchTransactionTypeComponent, CategoryChartComponent],
  templateUrl: './left-column.component.html',
  styleUrl: './left-column.component.css'
})
export class LeftColumnComponent implements OnInit{

  // przekazuje listę kont komponentowi AccountBudgetComponent (dziecko)
  accountsList: Account[] = [];

  // zmienna przechowuje id obecnie wybranego konta
  selectedAccountId: number = 0;

  // zmienna przechowuje obecnie wybrany typ transakcji
  selectedTransactionType: 'expense' | 'income' = 'expense';

  categoryChartData: any |undefined;

  // zmienne, które będą się zmieniać dla wykresu

  // zmienna przechowuje nazwy kategorii
  categoryNames: string[] = [];

  // zmienna przechowuje całościową kwotę dla danej kategorii
  amounts: number[] = [];

  // zmienna przechowuje kolory dla kategorii
  categoryColors: string[] = [];

  // dane do wykresu
  dane = {
    // nazwy kategorii
    // categoryNames
    labels:
    [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      // cała kwota dla danej kategorii
      // amount
      data: [300, 50, 100, 10, 20, 14],
      // kolory kategorii
      // categoryColors
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  // konfiguracja wykresu (wykorzystuje dane)
  config: any = {
    type: 'doughnut',
    data: this.dane,
  };

  onChartDataChange(accId: number, transactionType: 'expense' | 'income') {

    // wszystkie konta mają te same kategorie transakcji (dla wydatków i dla przychodów)
    // więc można zwyczajnie pobrać wszystkie kategorie dla danego typu transakcji

    // pobranie kategorii dla danego typu transakcji
    const categories = this.categoryService.getAllCategories().filter((category) => category.type === transactionType);

    // pobranie kolorów kategorii
    this.categoryColors = categories.map( (category) => category.color );

    // pobranie nazw kategorii
    this.categoryNames = categories.map((category) => category.name);

    // zmienna przechowuje dane do wyświetlenia na wykresie
    const categoryChart: CategoryChart[] = [];

    if(this.selectedAccountId === 0) {

      // const allTransactions = this.transactionService.getTransactions().filter( (transaction) => transaction.type === transactionType );

      for(const category of categories) {
        const categoryTransactions = this.transactionService.getTransactions().filter(
          (transaction) =>
            transaction.categoryId === category.id &&
            transaction.type === transactionType
        );

        const sum = categoryTransactions.reduce( (acc, transaction) => acc + transaction.amount, 0);

        categoryChart.push({
          name: category.name,
          color: category.color,
          sum: sum,
        });
      }

      console.log(categoryChart);


    } else {

      // dla każdej kategorii pobierane są transkacje
      for(const category of categories) {
        const categoryTransactions = this.transactionService.getTransactions().filter(
          (transaction) => 
            transaction.categoryId === category.id &&
            transaction.type === transactionType && 
            transaction.accountId === accId
        );

        const sum = categoryTransactions.reduce( (acc, transaction) => acc + transaction.amount, 0);

        categoryChart.push({
          name: category.name,
          color: category.color,
          sum: sum,
        });
      }

      console.log(categoryChart);

      // const transactions = this.transactionService.getTransactions().filter((transaction) => transaction.accountId === accId && transaction.type === transactionType);
      
      // this.dane.labels = this.categoryNames;
      // this.dane.datasets[0].backgroundColor = this.categoryColors;
    }

    this.dane.labels = categoryChart.map((summary) => summary.name);
    this.dane.datasets[0].data = categoryChart.map((summary) => summary.sum);
    this.dane.datasets[0].backgroundColor = categoryChart.map( (summary) => summary.color);
    // console.log("Names: ", this.categoryNames);
    // console.log("Colors: ", this.categoryColors);

    if (this.categoryChartData) {
      this.categoryChartData.update();
    }
  }
  
  constructor(private transactionService: TransactionService, private categoryService: CategoryService, private accountService: AccountService, private appStateService: AppStateService) {
  }

  ngOnInit(): void {
    // this.loadAccounts();
    this.accountsList = this.accountService.getAccounts();

    if (this.accountsList[0].id === 0) {
      this.accountsList.splice(0, 1);
    }

    const total = this.accountsList.reduce( (accumulator, currentIndex) => (accumulator + currentIndex.balance) , 0);
    const accSum: Account = {id:0, name: "Suma", balance: total};

    this.accountsList.splice(0, 0, accSum);

    this.appStateService.setSelectedAccount(this.accountsList[0]);

    this.categoryChartData = new Chart('CategoryChart', this.config);

    this.onChartDataChange(this.selectedAccountId, this.selectedTransactionType);
  }

  onAccountChange(accountId: number) {
    this.selectedAccountId = accountId;
    console.log("Parent: ", accountId);
    const account = this.accountsList.find(acc => acc.id === accountId);

    if (account) {
      this.appStateService.setSelectedAccount(account); // Prześlij obiekt do AppStateService
    }

    this.onChartDataChange(this.selectedAccountId, this.selectedTransactionType);
  }

  onChangeTransactionType(value: 'expense' | 'income') {
    console.log("Było: ", this.selectedTransactionType);
    this.selectedTransactionType = value;
    console.log("Jest: ", this.selectedTransactionType);
    this.onChartDataChange(this.selectedAccountId, this.selectedTransactionType);
  }

  onPeriodChange(period: "year" | "month" | "week" | "day") {
      console.log(period);
      this.updateDataChart(period, this.selectedAccountId);
  }

  updateDataChart(period: string, accountId: number) {
    
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
