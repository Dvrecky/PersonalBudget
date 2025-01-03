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
          date: new Date(transaction.date)
        }))
      )
    );
  }

  async getTransactionsAsync(): Promise<Transaction[]> {
    return firstValueFrom(this.http.get<Transaction[]>(this.apiUrl));
  }


  getTransactionsByAccount(account: Account): Observable<Transaction[]> {
    const url = `${this.apiUrl}/${account.id}`;
    return this.http.get<Transaction[]>(url).pipe(
      map(transactions =>
        transactions.map(transaction => ({
          ...transaction,
          date: new Date(transaction.date)
        }))
      )
    );
  }

  addTransaction(transactionData: Transaction) {
    return this.http.post(this.apiUrl, transactionData);
  }

  delete(accountId: Number) {
    return this.http.delete<void>(this.apiUrl + "/" + accountId);
  }
}
