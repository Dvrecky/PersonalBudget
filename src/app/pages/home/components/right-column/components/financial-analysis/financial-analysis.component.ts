import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../../../../models/transaction.model';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Chart, ChartConfiguration, registerables} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-financial-analysis',
  standalone: true,
  providers: [NativeDateAdapter],
  imports: [ CommonModule,MatFormFieldModule,
    MatDatepickerModule, FormsModule, ReactiveFormsModule, MatNativeDateModule],
  templateUrl: './financial-analysis.component.html',
  styleUrl: './financial-analysis.component.css'
})
export class FinancialAnalysisComponent implements OnChanges, OnInit {

  @Input() transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  activeFilter: string = 'day';

  income: number = 0;
  expense: number = 0;
  balanceSheet: number = 0;
  averageIncome: number = 0;
  averageExpenses: number = 0;
  savingsRate: number = 0;
  expensesRate: number = 0;

  chart: any;

  readonly range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      });

 ngOnInit(): void {
     this.range.valueChanges.subscribe(value => {
       if (value.start && value.end) {
         this.activeFilter = "";
         this.filterByDateRange(new Date(value.start), new Date(value.end));
       }

       if (!this.chart) {
         this.chart = new Chart("FinancialAnalysisChart", this.config);
       } else {
         this.chart.update();
       }

     });
   }

 ngOnChanges(): void {
    if (this.transactions.length > 0) {
        this.filteredTransactions = [...this.transactions];
        this.filterBy(this.activeFilter);
    }

   this.range.reset();
   this.activeFilter = 'day';
   this.range.valueChanges.subscribe(value => {
      if (value.start && value.end) {
        this.filterByDateRange(value.start, value.end);
      }
   });
   this.chart.update();
 }

  filterByDateRange(startDate: Date, endDate: Date) {
    this.filteredTransactions = this.transactions.filter(transaction =>
      transaction.date.getDate() >= startDate.getDate() && transaction.date.getDate() <= endDate.getDate()
    );
    this.updateAnalysisData();
 }


  updateChartDate(startDay: Date, endDay: Date) {

    this.config.data.datasets.forEach(dataset => dataset.data = []);

    if(startDay && !endDay) {
      for (let m=0; m <12; m++) {
        this.filteredTransactions.forEach(transaction => {
          if(transaction.date.getFullYear() === startDay.getFullYear() && transaction.date.getMonth() === m) {

            let transactionsForTheMonth: Transaction[] = this.filteredTransactions.filter(transaction => {
              return transaction.date.getMonth() === m;
            });

            let incomeSum = 0;
            let expenseSum = 0;
            transactionsForTheMonth.forEach(transaction => {
              if(transaction.type === "expense") {
                expenseSum += transaction.amount;
              }
              if(transaction.type === "income") {
                incomeSum += transaction.amount;
              }
            });
            this.config.data.datasets[0].data.push(incomeSum);
            this.config.data.datasets[1].data.push(expenseSum);
            this.config.data.datasets[2].data.push(incomeSum - expenseSum);

            m++;
          }
        })
        this.config.data.datasets[0].data.push(0);
        this.config.data.datasets[1].data.push(0);
        this.config.data.datasets[2].data.push(0);
      }
    }
    else {
      startDay.setHours(0, 0, 0, 0);
      endDay.setHours(0, 0, 0, 0)

      for(let d = new Date(startDay); d <= endDay; d.setDate(d.getDate() + 1)) {
        this.filteredTransactions.forEach(transaction => {
          if(transaction.date.getDate() === d.getDate()) {

            let transactionsForTheDay: Transaction[] = this.filteredTransactions.filter(transaction => {
              return transaction.date.toDateString() === d.toDateString();
            });

            let incomeSum = 0;
            let expenseSum = 0;
            transactionsForTheDay.forEach(transaction => {
              if(transaction.type === "expense") {
                expenseSum += transaction.amount;
              }
              if(transaction.type === "income") {
                incomeSum += transaction.amount;
              }
            });
            this.config.data.datasets[0].data.push(incomeSum);
            this.config.data.datasets[1].data.push(expenseSum);
            this.config.data.datasets[2].data.push(incomeSum - expenseSum);

            d.setDate(d.getDate() + 1)
          }
        })
        this.config.data.datasets[0].data.push(0);
        this.config.data.datasets[1].data.push(0);
        this.config.data.datasets[2].data.push(0);
      }
    }
  }

  filterBy(period: string) {
    this.range.reset();
    this.activeFilter = period;
    const now = new Date();
    let startDate: Date;
    let endDate: Date;
    let chartLabels: string[] = [];

    switch(period) {
      case 'day':
        startDate = now;
        endDate = now;
        this.filteredTransactions = this.transactions.filter(transaction => {
        return transaction.date.toDateString() === now.toDateString()});

        chartLabels =  [now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })];
        break;

      case 'week':
        const startOfWeek = new Date(now);
        const dayOfWeek = startOfWeek.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Odchylenie do poniedziałku
        startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        startDate = startOfWeek;
        endDate = endOfWeek;

        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date >= startOfWeek && transaction.date < endOfWeek;
          });

        for(let d = new Date(startOfWeek); d<= endOfWeek; d.setDate(d.getDate() + 1)){
          chartLabels.push(new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }));
        }
        break;

      case 'month':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        startDate = startOfMonth;
        endDate = endOfMonth;

        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date>= startOfMonth && transaction.date < endOfMonth;
        });

        const dayInMonth = endOfMonth.getDate();
        chartLabels =  Array.from({ length: dayInMonth }, (_, i)=> (i + 1).toString());
        break;

      case 'year':
        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date.getFullYear() === now.getFullYear()
          });
        startDate = now;
        chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        break;
    }
    this.updateAnalysisData();

    this.config.data.labels = chartLabels;
    // @ts-ignore
    this.updateChartDate(startDate, endDate);
    this.chart.update();
 }


  private updateAnalysisData() {
    this.income = this.filteredTransactions
      .filter(transaction => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    this.expense = this.filteredTransactions
      .filter(transaction => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    let expenseCounter = 0;
    let incomeCounter = 0;

    this.filteredTransactions.forEach(transaction => {
      if (transaction.type === "expense") {
        expenseCounter++;
      }
      if (transaction.type === "income") {
        incomeCounter++;
      }
    })

    this.balanceSheet = this.income - this.expense;
    this.averageIncome = this.income / incomeCounter;
    this.averageExpenses = this.expense / expenseCounter;
    this.savingsRate = (this.income - this.expense) / this.income * 100;
    this.expensesRate = this.expense / this.income * 100;
  }


  public config: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Income',
          data: [],
          backgroundColor: 'green',
        },
        {
          label: 'Expense',
          data: [],
          backgroundColor: 'red',
        },
        {
          label: 'Balanse Sheet',
          data: [],
          backgroundColor: 'blue',
        }
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

}
