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
import { CategoryChartDataStructure } from '../../../../models/CategoryChartDataStructure.model';
import { CategorySummaryComponent } from './components/category-summary/category-summary.component';
import { CategorySummary } from '../../../../models/categorySummary.model';

Chart.register(...registerables);

@Component({
  selector: 'app-left-column',
  standalone: true,
  imports: [AccountBudgetComponent, SwitchTransactionTypeComponent, CategoryChartComponent, CategorySummaryComponent],
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

  // zmienna przechowuje dane dla wyświetlenie przez CategorySummaryComponent
  categorySummary: CategorySummary[] = [];

  // zmienna reprezentująca wykres
  categoryChartData: any |undefined;

  categoryDataStructure: CategoryChartDataStructure | undefined;

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
    data: this.dane ,
  };

  constructor(private transactionService: TransactionService, private categoryService: CategoryService, private accountService: AccountService, private appStateService: AppStateService) {
  }

  ngOnInit(): void {
    this.loadAccounts();
    console.log(this.accountsList);
  }


  async updateCategorySummary(accId: number, transactionType: "expense" | "income") {
    this.categorySummary = [];
  
    try {
      // Pobierz kategorie i transakcje
      const categories = await this.categoryService.getAllCategoriesAsync();
      const transactions = await this.transactionService.getTransactionsAsync();
      console.log(categories);
      console.log(transactions)
  
      // Filtrowanie kategorii według typu transakcji
      const filteredCategories = categories.filter(category => category.type === transactionType);
  
      if (this.selectedAccountId === 0) {
        // Dla wszystkich kont
        for (const category of filteredCategories) {
          const categoryTransactions = transactions.filter(
            transaction =>
              transaction.categoryId === category.id &&
              transaction.type === transactionType
          );
  
          const sum = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  
          this.categorySummary.push({
            name: category.name,
            percentage: 0,
            amount: sum,
            iconPath: category.iconPath,
            color: category.color
          });
        }
      } else {
        // Dla wybranego konta
        for (const category of filteredCategories) {
          const categoryTransactions = transactions.filter(
            transaction =>
              transaction.categoryId === category.id &&
              transaction.type === transactionType &&
              transaction.accountId === accId
          );
  
          const sum = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  
          this.categorySummary.push({
            name: category.name,
            percentage: 0,
            amount: sum,
            iconPath: category.iconPath,
            color: category.color
          });
        }
      }
  
      console.log(this.categorySummary);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  }
  
  
  async onChartDataChange(accId: number, transactionType: 'expense' | 'income') {
    const categoryChart: CategoryChart[] = [];
  
    try {
      // Pobierz dane asynchronicznie
      const categories = await this.categoryService.getAllCategoriesAsync();
      const transactions = await this.transactionService.getTransactionsAsync();
  
      // Filtrowanie kategorii według typu transakcji
      const filteredCategories = categories.filter(category => category.type === transactionType);
  
      if (this.selectedAccountId === 0) {
        // Dla wszystkich kont
        for (const category of filteredCategories) {
          const categoryTransactions = transactions.filter(
            (transaction) =>
              transaction.categoryId === category.id &&
              transaction.type === transactionType
          );
  
          const sum = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  
          categoryChart.push({
            name: category.name,
            color: category.color,
            sum: sum,
          });
        }
      } else {
        // Dla wybranego konta
        for (const category of filteredCategories) {
          const categoryTransactions = transactions.filter(
            (transaction) =>
              transaction.categoryId === category.id &&
              transaction.type === transactionType &&
              transaction.accountId === accId
          );
  
          const sum = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  
          categoryChart.push({
            name: category.name,
            color: category.color,
            sum: sum,
          });
        }
      }
  
      // Aktualizacja danych wykresu
      this.dane.labels = categoryChart.map((summary) => summary.name);
      this.dane.datasets[0].data = categoryChart.map((summary) => summary.sum);
      this.dane.datasets[0].backgroundColor = categoryChart.map((summary) => summary.color);
  
      if (this.categoryChartData) {
        this.categoryChartData.update();
      }
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  }
  
  onAccountChange(accountId: number) {
    this.selectedAccountId = accountId;
    console.log("Parent: ", accountId);
    const account = this.accountsList.find(acc => acc.id === accountId);

    if (account) {
      this.appStateService.setSelectedAccount(account); // Prześlij obiekt do AppStateService
    }

    this.onChartDataChange(this.selectedAccountId, this.selectedTransactionType);
    this.updateCategorySummary(this.selectedAccountId, this.selectedTransactionType);
  }

  onChangeTransactionType(value: 'expense' | 'income') {
    console.log("Było: ", this.selectedTransactionType);
    this.selectedTransactionType = value;
    console.log("Jest: ", this.selectedTransactionType);
    this.onChartDataChange(this.selectedAccountId, this.selectedTransactionType);
    this.updateCategorySummary(this.selectedAccountId, this.selectedTransactionType);
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

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (response: Account[]) => {
        this.accountsList = response;

        // Oblicz sumę po pobraniu kont
        this.calculateTotalBalance();

        this.appStateService.setSelectedAccount(this.accountsList[0]);

        this.categoryChartData = new Chart('CategoryChart', this.config);

        this.onChartDataChange(this.selectedAccountId, this.selectedTransactionType);
        this.updateCategorySummary(this.selectedAccountId, this.selectedTransactionType);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  calculateTotalBalance(): void {
    const total = this.accountsList.reduce((accumulator, currentIndex) => accumulator + currentIndex.balance, 0);
    console.log('Total Balance:', total);

    const accSum: Account = { id: 0, name: "Suma", balance: total };

    // Dodanie konta "Suma" na początku listy kont
    this.accountsList.splice(0, 0, accSum);
  }
}
