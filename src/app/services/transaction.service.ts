import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  private transactions: Transaction[] = [
      {
          id: 1,
          amount: 1500,
          date: new Date(2024, 10, 25), // 25 listopada 2024
          description: "Wynagrodzenie za pracę",
          recurring: true,
          recurringPeriod: "monthly",
          type: "income",
          accountId: 1,
          categoryId: 1
      },
      {
          id: 2,
          amount: 200,
          date: new Date(2024, 10, 20),
          description: "Rachunek za prąd",
          recurring: true,
          recurringPeriod: "monthly",
          type: "expense",
          accountId: 2,
          categoryId: 2
      },
      {
          id: 3,
          amount: 50,
          date: new Date(2024, 10, 15),
          description: "Zakupy spożywcze",
          recurring: false,
          recurringPeriod: "",
          type: "expense",
          accountId: 1,
          categoryId: 3
      },
      {
          id: 4,
          amount: 300,
          date: new Date(2024, 10, 10),
          description: "Zwrot podatku",
          recurring: false,
          recurringPeriod: "",
          type: "income",
          accountId: 3,
          categoryId: 4
      },
      {
          id: 5,
          amount: 310,
          date: new Date(2024, 11, 24),
          description: "Zwrot podatku",
          recurring: false,
          recurringPeriod: "",
          type: "income",
          accountId: 1,
          categoryId: 4
      },
      {
          id: 6,
          amount: 300,
          date: new Date(2024, 11, 2),
          description: "Zwrot podatku",
          recurring: false,
          recurringPeriod: "",
          type: "income",
          accountId: 1,
          categoryId: 4
      },
    {
        id: 7,
        amount: 300,
        date: new Date(2024, 5, 2),
        description: "Zwrot podatku",
        recurring: false,
        recurringPeriod: "",
        type: "income",
        accountId: 1,
        categoryId: 4
    },
    {
        id: 8,
        amount: 300,
        date: new Date(2024, 9, 2),
        description: "Zwrot podatku",
        recurring: false,
        recurringPeriod: "",
        type: "income",
        accountId: 1,
        categoryId: 4
    }
  ];

   getTransactions(): Transaction[] {
      //return this.http.get<Account[]>(this.apiUrl);
      return this.transactions;
    }

  getTransactionsByAccount(account: Account): Transaction[] {
      return this.transactions.filter(transaction => transaction.accountId === account.id);
    }

    

}
