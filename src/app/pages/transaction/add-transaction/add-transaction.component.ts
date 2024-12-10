import { Component, OnInit } from '@angular/core';
import { TransactionTypeComponent } from "./components/transaction-type/transaction-type.component";
import { AmountComponent } from "./components/amount/amount.component";
import { AccountSelectorComponent } from "./components/account-selector/account-selector.component";
import { CategorySelectorComponent } from "./components/category-selector/category-selector.component";
import {Category} from '../../../models/category.model';
import {CategoryService} from '../../../services/category.service';
import {DateComponent} from './components/date/date.component';
import {RecurringPaymentComponent} from './components/recurring-payment/recurring-payment.component';
import {Account} from '../../../models/account.model';
import {AccountService} from '../../../services/account.service';


@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [TransactionTypeComponent, AmountComponent, AccountSelectorComponent, CategorySelectorComponent, DateComponent, RecurringPaymentComponent],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent implements OnInit {

  constructor(private categoryService: CategoryService, private accountService: AccountService,) {}
  categories: Category[] = [];
  accounts: Account[] = [];

  ngOnInit() {
    this.categories = this.categoryService.getAllCategories();
    this.accounts = this.accountService.getAccounts();
  }

  handleTransactionsTypeChange($event: any) {
    console.log($event);
  }

  handleAccountChange($event: any) {
    console.log($event);
  }

  handleCategoryChange($event: any) {
    console.log($event);
  }

  handleAmountChange($event: any) {
    console.log($event);
  }

  handleDateChange($event: any) {
    console.log($event);
  }

  handleRecurringChange($event: any) {
    console.log($event)
  }
}
