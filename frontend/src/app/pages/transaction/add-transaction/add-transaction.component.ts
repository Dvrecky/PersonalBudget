import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import {MatNativeDateModule, NativeDateAdapter} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';

import { AccountSelectorComponent } from "./components/account-selector/account-selector.component";
import { CategorySelectorComponent } from "./components/category-selector/category-selector.component";
import { RecurringPaymentComponent } from './components/recurring-payment/recurring-payment.component';
import { TransactionTypeComponent } from "./components/transaction-type/transaction-type.component";

import { AccountService } from '../../../services/account.service';
import { CategoryService } from '../../../services/category.service';

import { Account } from '../../../models/account.model';
import { Category } from '../../../models/category.model';
import {TransactionService} from '../../../services/transaction.service';
import {Transaction} from '../../../models/transaction.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    TransactionTypeComponent,
    AccountSelectorComponent,
    CategorySelectorComponent,
    MatNativeDateModule,
    RecurringPaymentComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  providers: [NativeDateAdapter],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent implements OnInit {
  transactionForm: FormGroup = new FormGroup({});
  categories: Category[] = [];
  accounts: Account[] = [];
  amount: number = 0;

  constructor(
              private categoryService: CategoryService,
              private accountService: AccountService,
              private transactionService: TransactionService,
              private fb: FormBuilder
  ) {}


  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })

    this.loadAccounts();


    this.transactionForm = this.fb.group({
      type: ['Expense', Validators.required],
      accountId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.maxLength(20)]],
      categoryId: ['', Validators.required],
      date: ['', Validators.required],
      recurring: [false],
      recurringPeriod: ['', []]
    });
  }

  onTransactionTypeChange($event: any) {
    this.transactionForm.controls['type'].setValue($event);
  }

  onAccountSelected(accountId: number | null): void {
    this.transactionForm.get('accountId')?.setValue(accountId);
  }

  onCategoryChange(categoryId: number | null): void {
    this.transactionForm.controls['categoryId'].setValue(categoryId);
  }

  onRecurringChange(data: { recurring: boolean, recurringPeriod: string }) {
    this.transactionForm.controls['recurring'].setValue(data.recurring);
    this.transactionForm.controls['recurringPeriod'].setValue(data.recurringPeriod);

  }

  onTransactionConfirmed() {
    if (this.transactionForm.valid) {
      const transactionData: Transaction = this.transactionForm.value;
      console.log('Transaction Form Data:', this.transactionForm.value);


      this.transactionService.addTransaction(transactionData).subscribe(
        (response) => {
          console.log('Transaction created successfully:', response);

        },
        (error) =>{
          console.error('Error creating transaction:', error);
        }
      )
    } else {
      console.log('Form is invalid');
    }
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (response: Account[]) => {
        this.accounts = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
