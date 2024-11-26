import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  // zmienna przechowuje ostatnią emitowaną wartość
  // umożliwia jej pobranie przez nowych subskrybentów od razu po ich zapisaniu się
  // wartość w nawiasach to wartość początkowa
  private selectedAccount = new BehaviorSubject<Account | null>(null);

  // znak $ na końcu nazwy zmiennej, oznacza, że dana zmienna jest strumieniem
  selectedAccount$ = this.selectedAccount.asObservable();

  // metoda ustawia wybrane konto
  setSelectedAccount(account: Account) {
    this.selectedAccount.next(account);
  }
}
