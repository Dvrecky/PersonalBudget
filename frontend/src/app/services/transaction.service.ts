import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Account } from '../models/account.model';
import {HttpClient} from '@angular/common/http';
import {map, Observable, firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly apiUrl = "http://localhost:8080/api/transactions";

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl).pipe(
      map(transactions =>
        transactions.map(transaction => ({
          ...transaction,
          date: new Date(transaction.date) // Konwersja LocalDateTime (string) na Date
        }))
      )
    );
  }

  async getTransactionsAsync(): Promise<Transaction[]> {
    return firstValueFrom(this.http.get<Transaction[]>(this.apiUrl));
  }

  getTransactionsByType(type: string): Observable<Transaction[]> {
    return this.getTransactions().pipe(
      map(transactions => transactions.filter(transaction => transaction.type === type))
    );
  }
  

  // Pobieranie transakcji dla konkretnego konta i konwersja daty
  getTransactionsByAccount(account: Account): Observable<Transaction[]> {
    const url = `${this.apiUrl}/${account.id}`;
    return this.http.get<Transaction[]>(url).pipe(
      map(transactions =>
        transactions.map(transaction => ({
          ...transaction,
          date: new Date(transaction.date) // Konwersja LocalDateTime (string) na Date
        }))
      )
    );
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
