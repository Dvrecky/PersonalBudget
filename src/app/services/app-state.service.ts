import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private selectedAccount = new BehaviorSubject<Account | null>(null);
  selectedAccount$ = this.selectedAccount.asObservable();

  // metoda ustawia wybrane konto
  setSelectedAccount(account: Account) {
  this.selectedAccount.next(account);
  }
}
