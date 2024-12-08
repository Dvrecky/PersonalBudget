import { Component, OnInit } from '@angular/core';
import { AccountHeaderComponent } from '../components/account-header/account-header.component';
import { AccountSummaryComponent } from '../components/account-summary/account-summary.component';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../models/account.model';
import { AccountsListComponent } from "../components/accounts-list/accounts-list.component";

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

    this.accountsList = this.accountService.getAccounts().filter( (account) => account.id !== 0 );

    // lub
    // const accounts = this.accountService.getAccounts().filter((acc) => acc.id === 0);
    // ale może pojawić się problem, gdy najpierw nie załaduje się strona główna
    
    this.sum = this.accountsList.reduce( (acc, currentIndex) => acc + currentIndex.balance, 0 );
    console.log("Parent: ", this.sum);
  }
}
