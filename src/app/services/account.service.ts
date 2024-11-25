import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = "http://localhost:8080/api/accounts"

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  } 
}
