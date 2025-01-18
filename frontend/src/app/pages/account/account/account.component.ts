import { Component, OnInit } from '@angular/core';
import { AccountHeaderComponent } from '../components/account-header/account-header.component';
import { AccountSummaryComponent } from '../components/account-summary/account-summary.component';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../models/account.model';
import { AccountsListComponent } from "../components/accounts-list/accounts-list.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccountHeaderComponent, AccountSummaryComponent, AccountsListComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{

  sum: number = 0;

  accountsList: Account[] = [];

  constructor(private accountService: AccountService){}

  ngOnInit(): void {

    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (response: Account[]) => {
        this.accountsList = response;
        this.calculateSum(); // Oblicz sumę po załadowaniu danyc
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  calculateSum(): void {
    this.sum = this.accountsList.reduce((acc, currentIndex) => acc + currentIndex.balance, 0);
    console.log("Parent: ", this.sum);
  }

  onAccountDeleted(accountId: number): void {
    this.accountsList = this.accountsList.filter(account => account.id !== accountId); // Usuń konto z listy
    this.calculateSum(); // Przelicz sumę
  }

  onAccountAdded(newAccount: Account): void {
    this.accountsList = [...this.accountsList, newAccount]; // Dodaj nowe konto do listy
    this.calculateSum(); // Przelicz sumę
  }

  onAccountUpdated(updatedAccount: Account): void {
    const index = this.accountsList.findIndex(account => account.id === updatedAccount.id);
    if (index !== -1) {
      this.accountsList[index] = updatedAccount;
      this.accountsList = [...this.accountsList];  // Stworzenie nowej referencji do tablicy
      this.calculateSum(); // Aktualizacja sumy
    }
  }
  
}
