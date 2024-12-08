import { Component, OnInit } from '@angular/core';
import { AccountHeaderComponent } from '../components/account-header/account-header.component';
import { AccountSummaryComponent } from '../components/account-summary/account-summary.component';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccountHeaderComponent, AccountSummaryComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{

  sum: number = 0;

  constructor(private accountService: AccountService){}

  ngOnInit(): void {
    const accounts = this.accountService.getAccounts();
    this.sum = accounts.reduce( (previousValue, currentValue) => previousValue + currentValue.balance, 0);
    console.log("Parent: ", this.sum);
  }

}
