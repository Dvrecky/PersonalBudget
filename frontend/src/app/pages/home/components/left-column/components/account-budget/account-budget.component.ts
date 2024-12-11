import { Component, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Account } from '../../../../../../models/account.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CurrencyPipe } from '@angular/common';
import { Input, Output } from '@angular/core';
import { PlnPipe } from '../../../../../../pipes/pln.pipe';

@Component({
  selector: 'app-account-budget',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, CurrencyPipe, PlnPipe],
  templateUrl: './account-budget.component.html',
  styleUrl: './account-budget.component.css'
})
export class AccountBudgetComponent implements OnInit, OnChanges{

  // lista z kontami będzie przekazywana poprzez komponent rodzica
  @Input() accounts: Account[] = [];
  // wysyła wiadomośc do komponentu rodzica, że zmieniono typ konta
  @Output() accountChange = new EventEmitter<number>();
  
  selectedAccountId: number = 0;
  sum: number = 0;

  ngOnInit(): void {
    this.sum = this.accounts[0].balance;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accounts'] && this.accounts.length > 0) {
      // Aktualizacja sumy po otrzymaniu nowych danych
      this.sum = this.accounts[0]?.balance || 0;
    }
  }

  onAccountChange(accountId: number): void {
    console.log('Selected Account ID:', accountId);
    this.selectedAccountId = accountId;
    this.sum = this.accounts[this.selectedAccountId].balance;
    this.accountChange.emit(accountId);
  }
}
