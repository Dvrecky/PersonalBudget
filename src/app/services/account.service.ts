import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accounts: Account[] = [
      { id: 1, name: "Konto głowne", balance: 1000 },
      { id: 2, name: "Konto oszczednosciowe", balance: 2056 },
      { id: 3, name: "Konto 1", balance: 395 },
  ];

  private apiUrl = "http://localhost:8080/api/accounts";

 // constructor(private http: HttpClient) { }
  constructor(private transactionService: TransactionService) { }

//   getAccounts(): Observable<Account[]> {
//     return this.http.get<Account[]>(thiclears.apiUrl);
//   }

 getAccounts(): Account[] {
    return this.accounts;
  }

//   addAccount(account: Account): Observable<Account> {
//     return this.http.post<Account>(this.apiUrl, account);
//   }

  // addAccount(accountName: string, balance: number): void {
  //   this.accounts.push({
  //       name: accountName,
  //       balance: balance
  //   });
  // }

  deleteAccount(accId: number): void {
    const index = this.accounts.findIndex((acc)=> acc.id === accId);
    if(index) {
      this.accounts.splice(index,1);
      this.transactionService.deleteTransactionForGivenAccount(accId);
    }

  }

}

