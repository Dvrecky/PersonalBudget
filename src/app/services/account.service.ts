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

  private accounts: Account[] = [
      { id: 1, name: "Konto głowne", balance: 1000 },
      { id: 2, name: "Konto oszczednosciowe", balance: 2056 },
      { id: 3, name: "Konto 1", balance: 395 },
  ];

  private readonly apiUrl = "http://localhost:8080/api/accounts";

//  constructor(private http: HttpClient) { }
  constructor(private transactionService: TransactionService) { }

//   getAccounts(): Observable<Account[]> {
//     return this.http.get<Account[]>(thiclears.apiUrl);
//   }

 getAccounts(): Account[] {
    return this.accounts;
  }

  addAccount(account: CreateAccount): void {
    const arrayLength = this.accounts.length;
    const newAccId = this.accounts[arrayLength-1].id+1;
    this.accounts.push({
      id: newAccId,
      ...account // operator spread, pozwala na skopiowanie wszystkich właściwości z obiekt account i wstawienie ich do nowego obiektu
    });

    console.log(this.accounts);
  }

  // addAccount(accountData: CreateAccount): Observable<Account> {
  //   return this.http.post<Account>(this.apiUrl, accountData);
  // }

  deleteAccount(accId: number): void {
    const index = this.accounts.findIndex((acc)=> acc.id === accId);
    if(index) {
      this.accounts.splice(index,1);
      this.transactionService.deleteTransactionForGivenAccount(accId);
    }

  }

}

