import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { TransactionService } from './transaction.service';
import { CreateAccount } from '../models/createAccount.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accounts: Account[] = [];

  private readonly apiUrl = "http://localhost:8080/api/accounts";

  constructor(private http: HttpClient, private transactionService: TransactionService) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  addAccount(accountData: CreateAccount): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, accountData);
  }

  deleteAccount(accId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${accId}`);
  }
  
  updateAccount(acc: Account): Observable<Account> {
    return this.http.put<Account>(this.apiUrl, acc);
  }

}

