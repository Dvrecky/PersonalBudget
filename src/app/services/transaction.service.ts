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
          date: new Date(2024, 11, 25),
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
          date: new Date(2024, 11, 2),
          description: "Rachunek za prąd",
          recurring: true,
          recurringPeriod: "monthly",
          type: "expense",
          accountId: 1,
          categoryId: 2
      },
      {
          id: 3,
          amount: 50,
          date: new Date(2024, 11, 30),
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
          date: new Date(2024, 11, 10),
          description: "Zwrot podatku",
          recurring: false,
          recurringPeriod: "",
          type: "income",
          accountId: 1,
          categoryId: 4
      },
      {
          id: 5,
          amount: 310,
          date: new Date(2024, 11, 21),
          description: "Zwrot podatku",
          recurring: false,
          recurringPeriod: "",
          type: "income",
          accountId: 1,
          categoryId: 4
       },
      {
          id: 6,
          amount: 120,
          date: new Date(),
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
          date: new Date(),
          description: "Zwrot podatku",
          recurring: false,
          recurringPeriod: "",
          type: "expense",
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
      },
      {
          id: 9,
          amount: 310,
          date: new Date(2024, 1, 2),
          description: "Zwrot podatku",
          recurring: false,
          recurringPeriod: "",
          type: "income",
          accountId: 1,
          categoryId: 4
      },
      {
          id: 10,
          amount: 1000,
          date: new Date(2024, 3, 2),
          description: "oddanie dlugu",
          recurring: false,
          recurringPeriod: "",
          type: "expense",
          accountId: 1,
          categoryId: 4
      }
    // {
    //   id: 11,
    //   amount: 210,
    //   date: new Date(),
    //   description: "Zakupy",
    //   recurring: false,
    //   recurringPeriod: "",
    //   type: "expense",
    //   accountId: 1,
    //   categoryId: 4
    // }
  ];

   getTransactions(): Transaction[] {
      //return this.http.get<Account[]>(this.apiUrl);
      return this.transactions;
    }

  getTransactionsByAccount(account: Account): Transaction[] {
      return this.transactions.filter(transaction => transaction.accountId === account.id);
    }

<<<<<<< HEAD
=======
    

>>>>>>> e5b8106f94d4f6d2220c501f8dae7015dae79d26
}
