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

    // this.accountsList = this.accountService.getAccounts().filter( (account) => account.id !== 0 );
    this.loadAccounts();
    
    this.sum = this.accountsList.reduce( (acc, currentIndex) => acc + currentIndex.balance, 0 );
    console.log("Parent: ", this.sum);
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (response: Account[]) => {
        this.accountsList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
