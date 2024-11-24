import { Component, OnInit } from '@angular/core';
import { Account } from '../../../../../../models/account.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-account-budget',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, CurrencyPipe],
  templateUrl: './account-budget.component.html',
  styleUrl: './account-budget.component.css'
})
export class AccountBudgetComponent implements OnInit{

  accounts: Account[] = [
    { id: 1, name: "Konto główne", balance: 1000},
    { id: 2, name: 'Oszczędnościowe', balance: 5000 },
    { id: 3, name: 'Karta kredytowa', balance: 300 },
  ];
  selectedAccountId: number = 0;
  sum: number = 0;

  ngOnInit(): void {
  
    const total = this.accounts.reduce( (accumulator, currentIndex) => (accumulator + currentIndex.balance) , 0);
    const accSum: Account = {id:0, name: "Suma", balance: total};
    this.accounts.splice(0, 0, accSum);
    this.sum = total;
  }

  onAccountChange(accountId: number): void {
    console.log('Selected Account ID:', accountId);
    this.selectedAccountId = accountId;

    this.sum = this.accounts[this.selectedAccountId].balance;
    
  }
}
