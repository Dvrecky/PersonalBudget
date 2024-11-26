import { Component } from '@angular/core';
import { TransactionTypeComponent } from "./components/transaction-type/transaction-type.component";
import { AmountComponent } from "./components/amount/amount.component";
import { AccountSelectorComponent } from "./components/account-selector/account-selector.component";
import { CategorySelectorComponent } from "./components/category-selector/category-selector.component";

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [TransactionTypeComponent, AmountComponent, AccountSelectorComponent, CategorySelectorComponent],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent {

}
