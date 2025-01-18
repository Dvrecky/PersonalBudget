import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output
} from '@angular/core';
import { Transaction } from '../../../../../../models/transaction.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NativeDateAdapter, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Subscription} from 'rxjs';
import {Account} from '../../../../../../models/account.model';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from '@angular/material/button';
import {PlnPipe} from '../../../../../../pipes/pln.pipe';
import {TransactionTypeClassDirective} from '../../../../../../transaction-type-class.directive';
import {MatDialog} from '@angular/material/dialog';
import {DeleteTransactionDialogComponent} from './delete-transaction-dialog/delete-transaction-dialog.component';
import {UpdateTransactionDialogComponent} from './update-transaction-dialog/update-transaction-dialog.component';
import {Category} from '../../../../../../models/category.model';
import {CategoryService} from '../../../../../../services/category.service';


@Component({
  selector: 'app-transaction-history',
  standalone: true,
  providers: [NativeDateAdapter],
  imports: [CommonModule, MatListModule, DatePipe, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatNativeDateModule, MatIconModule, MatMenuModule, MatButtonModule, PlnPipe, TransactionTypeClassDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnChanges,OnDestroy {

  @Input() transactions: Transaction[] = [];
  @Input() selectedAccount: Account | null = null;
  @Input() accounts: Account[] = [];
  @Output() deleteTransaction = new EventEmitter<number>();

  selectedAccountName:string = '';
  filteredTransactions: Transaction[] = [];
  activeFilter: string = 'day';
  private categories: Category[] = [];
  private rangeSubscription: Subscription | undefined;

  readonly range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
  });

  readonly dialog = inject(MatDialog);

  constructor(private categoryService: CategoryService,) {
  }

  openDeleteTransactionDialog(enterAnimationDuration: string, exitAnimationDuration: string, transactionId: number ) {
     const transaction = this.transactions.find((t) => t.id === transactionId);
     const accountName = this.accounts.find((t) => t.id === transaction?.accountId)?.name;
     const categoryName = this.categories.find((t) => t.id === transaction?.categoryId)?.name;

     const dialogRef =  this.dialog.open(DeleteTransactionDialogComponent, {
      autoFocus: false,
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {transaction, accountName, categoryName}
    })

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result === 'deleted') {
        this.refreshTransactions();
      }
    });
  }

  openUpdateTransactionDialog(enterAnimationDuration: string, exitAnimationDuration: string, transactionId: number) {
    const transaction = this.transactions.find((t) => t.id === transactionId);
    const accounts = this.accounts;
    const categories = this.categories;

    const dialogRef =  this.dialog.open(UpdateTransactionDialogComponent, {
      autoFocus: false,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {transaction, accounts, categories}
    })

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result === 'updated') {
        this.refreshTransactions();
      }
    });
  }

  private refreshTransactions() {
    this.deleteTransaction.emit();
  }

  ngOnChanges(): void {
    if(this.selectedAccount) {
      this.selectedAccountName = this.selectedAccount.name;
    }

    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories
    })

    this.filteredTransactions = [];

    this.filteredTransactions = [...this.transactions];

    this.filterBy(this.activeFilter);

     this.range.valueChanges.subscribe(value => {
        if (value.start && value.end) {
          this.activeFilter = "";
          this.filterByDateRange(new Date(value.start), new Date(value.end));
        }
     });
    }

  ngOnDestroy(): void {
    if (this.rangeSubscription) {
      this.rangeSubscription.unsubscribe();
    }
  }

  filterByDateRange(startDate: Date, endDate: Date) {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = transaction.date;
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    }

  filterBy(period: string) {
    this.range.reset();
    this.activeFilter = period;
    const now = new Date();
    now.setHours(0,0,0,0);
    switch(period) {
      case 'day':
        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date.toDateString() === now.toDateString()});
        break;

      case 'week':
        const startOfWeek = new Date(now);
        const dayOfWeek = startOfWeek.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date >= startOfWeek && transaction.date < endOfWeek;
          });
        break;

      case 'month':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date >= startOfMonth && transaction.date < endOfMonth;
        });
        break;

      case 'year':
        this.filteredTransactions = this.transactions.filter(transaction => {
          return transaction.date.getFullYear() === now.getFullYear()
          });
        break;
    }
  }

  getAccountName(accountId: number): string {
    const account = this.accounts.find(acc => acc.id === accountId);
    return account ? account.name : 'Nieznane konto';
  }

}
