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

