import { Component, OnInit } from '@angular/core';
import { TransactionTypeComponent } from "./components/transaction-type/transaction-type.component";
import { AmountComponent } from "./components/amount/amount.component";
import { AccountSelectorComponent } from "./components/account-selector/account-selector.component";
import { CategorySelectorComponent } from "./components/category-selector/category-selector.component";
import {Category} from '../../../models/category.model';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [TransactionTypeComponent, AmountComponent, AccountSelectorComponent, CategorySelectorComponent],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent implements OnInit {

  constructor(private categoryService: CategoryService) {}
  categories: Category[] = [];

  ngOnInit() {
    this.categories = this.categoryService.getAllCategories();
  }

}
