import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import {MatNativeDateModule, NativeDateAdapter} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

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
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
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
    MatDatepickerModule,
  ],
  providers: [NativeDateAdapter],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})

export class AddTransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  categories: Category[] = [];
  accounts: Account[] = [];
  amount: number = 0;
  private _snackBar = inject(MatSnackBar);

  @ViewChild(RecurringPaymentComponent) recurringPaymentComponent!: RecurringPaymentComponent;

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
      type: ['expense', [Validators.required]],
      accountId: ['', [Validators.required]],
      amount: [0.01, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-z0-9 ]+$')]],
      categoryId: ['', [Validators.required]],
      date: ['', Validators.required],
      recurring: [false],
      recurringPeriod: ['', []]
    });
   }

  openSnackBar() {
    this._snackBar.open("Transactin added sucessfully!");
  }

  onTransactionConfirmed() {
    if (this.transactionForm.valid) {
      const transactionData: Transaction = this.transactionForm.value;

      const selectedDate = transactionData.date;
      const utcDate = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        )
      );
      transactionData.date = utcDate;

      this.transactionService.addTransaction(transactionData).subscribe(
        () => {

          this.openSnackBar();

          this.transactionForm.reset({
            type: 'expense',
            accountId: '',
            amount: 0.01,
            description: '',
            categoryId: '',
            date: '',
            recurring: false,
            recurringPeriod: ''
          });

          this.recurringPaymentComponent.selectedFrequency = '';
          this.recurringPaymentComponent.isRecurring = false;
          this.recurringPaymentComponent.formGroup.patchValue({
            recurring: false,
            recurringPeriod: ''
          });

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


