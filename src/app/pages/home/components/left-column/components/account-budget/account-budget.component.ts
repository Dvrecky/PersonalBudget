import { Component, EventEmitter, OnInit } from '@angular/core';
import { Account } from '../../../../../../models/account.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CurrencyPipe } from '@angular/common';
import { Input, Output } from '@angular/core';

@Component({
  selector: 'app-account-budget',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, CurrencyPipe],
  templateUrl: './account-budget.component.html',
  styleUrl: './account-budget.component.css'
})
export class AccountBudgetComponent implements OnInit{

  // lista z kontami będzie przekazywana poprzez komponent rodzica
  @Input() accounts: Account[] = [];
  // wysyła wiadomośc do komponentu rodzica, że zmieniono typ konta
  @Output() accountChange = new EventEmitter<number>();
  
  selectedAccountId: number = 0;
  sum: number = 0;

  ngOnInit(): void {
    this.sum = this.accounts[0].balance;
  }

  onAccountChange(accountId: number): void {
    console.log('Selected Account ID:', accountId);
    this.selectedAccountId = accountId;
    this.sum = this.accounts[this.selectedAccountId].balance;
    this.accountChange.emit(accountId);
  }
}
