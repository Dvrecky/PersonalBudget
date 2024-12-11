import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Account } from '../models/account.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly apiUrl = "http://localhost:8080/api/transactions";

  constructor(private http: HttpClient) {
  }

  // private transactions: Transaction[] = [
  //   { id: 1, amount: 1500, date: new Date(2024, 11, 25), description: "Wynagrodzenie za pracę", recurring: true, recurringPeriod: "monthly", type: "income", accountId: 1, categoryId: 1 },
  //   { id: 2, amount: 200, date: new Date(2024, 11, 2), description: "Rachunek za prąd", recurring: true, recurringPeriod: "monthly", type: "expense", accountId: 1, categoryId: 8 },
  //   { id: 3, amount: 50, date: new Date(2024, 11, 30), description: "Zakupy spożywcze", recurring: false, recurringPeriod: "", type: "expense", accountId: 1, categoryId: 6 },
  //   { id: 4, amount: 300, date: new Date(2024, 11, 10), description: "Prezent", recurring: false, recurringPeriod: "", type: "income", accountId: 1, categoryId: 4 },
  //   { id: 5, amount: 310, date: new Date(2024, 11, 21), description: "Premia za freelancing", recurring: false, recurringPeriod: "", type: "income", accountId: 1, categoryId: 2 },
  //   { id: 6, amount: 120, date: new Date(), description: "Prezent urodzinowy", recurring: false, recurringPeriod: "", type: "income", accountId: 1, categoryId: 4 },
  //   { id: 7, amount: 300, date: new Date(), description: "Naprawa samochodu", recurring: false, recurringPeriod: "", type: "expense", accountId: 1, categoryId: 7 },
  //   { id: 8, amount: 100, date: new Date(2024, 9, 2), description: "Zwrot podatku", recurring: false, recurringPeriod: "", type: "income", accountId: 2, categoryId: 3 },
  //   { id: 9, amount: 400, date: new Date(2024, 1, 2), description: "Rachunek za gaz", recurring: false, recurringPeriod: "", type: "expense", accountId: 2, categoryId: 8 },
  //   { id: 10, amount: 1000, date: new Date(2024, 3, 2), description: "Czynsz", recurring: false, recurringPeriod: "", type: "expense", accountId: 3, categoryId: 5 }
  // ];

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getTransactionsByAccount(account: Account): Observable<Transaction[]> {
    const url = `${this.apiUrl}/${account.id}`;
    return this.http.get<Transaction[]>(url);
  }

  // deleteTransactionForGivenAccount(accId: number): void {
  //   console.log(this.transactions);
  //
  //   for (let i = this.transactions.length - 1; i >= 0; i--) {
  //     if (this.transactions[i].id === accId) {
  //       this.transactions.splice(i, 1);
  //     }
  //   }
  //   console.log(this.transactions);
  // }

  // addTransaction(transactionData: Transaction)Observable<Transaction> {
  //   return this.http.post<Transaction>(this.apiUrl, transaction);
  // }
}
