import { ChangeDetectionStrategy, Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { Account } from '../../../../models/account.model';
import { MatCardModule } from '@angular/material/card';
import { AccountListItemComponent } from './components/account-list-item/account-list-item.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddAccountDialogComponent } from './dialog/add-account-dialog/add-account-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateAccountDialogComponent } from './components/dialog/update-account-dialog/update-account-dialog.component';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [MatCardModule, AccountListItemComponent, MatListModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListComponent{

  // uzyskanie instancji serwisu MatDialog, do zarządzania dialogami
  // potrzebne, aby odwołąć się do danego dialogu
  readonly dialog = inject(MatDialog);

  @Input() accountsList: Account[] = [];
  @Output() accountDeleted = new EventEmitter<number>();
  @Output() accountAdded = new EventEmitter<Account>(); // Dodane zdarzenie dla dodania konta
  @Output() accountUpdated = new EventEmitter<Account>();

  openDialogWithAddAccountForm(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddAccountDialogComponent, {
      autoFocus: false,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((newAccount: Account | null) => {
      if (newAccount) {
        this.accountAdded.emit(newAccount); // Emitowanie zdarzenia dodania konta
      }
    });
  }

  openDialogWithUpdateAccountForm(account: Account, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(UpdateAccountDialogComponent, {
      autoFocus: false,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: account
    });

    dialogRef.afterClosed().subscribe((updatedAccount: Account | null) => {
      if (updatedAccount) {
        this.accountUpdated.emit(updatedAccount); // Emitowanie zdarzenia aktualizacji konta
      }
    });
  }

  onAccountDeleted(accountId: number): void {
    this.accountDeleted.emit(accountId); // Przekazanie zdarzenia nadrzędnemu komponentowi
  }

  onAccountUpdated(updatedAccount: Account): void {
    const index = this.accountsList.findIndex(account => account.id === updatedAccount.id);
    if (index !== -1) {
      // Zaktualizuj konto na liście
      this.accountsList[index] = updatedAccount;
  
      // Aby Angular wykrył zmiany, tworzysz nową tablicę
      this.accountsList = [...this.accountsList];
    }
  }
  
}
