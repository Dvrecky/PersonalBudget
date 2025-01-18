import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { Account } from '../../../../../../models/account.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PlnPipe } from '../../../../../../pipes/pln.pipe';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DeleteAccountDialogComponent } from '../dialog/delete-account-dialog/delete-account-dialog.component';
import { UpdateAccountDialogComponent } from '../dialog/update-account-dialog/update-account-dialog.component';


@Component({
  selector: 'app-account-list-item',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, PlnPipe],
  templateUrl: './account-list-item.component.html',
  styleUrl: './account-list-item.component.css'
})
export class AccountListItemComponent {

  readonly dialog = inject(MatDialog);
  @Input() account: Account | any;
  @Output() accountDeleted = new EventEmitter<number>(); // Nowy EventEmitter
  @Output() accountUpdated = new EventEmitter<Account>(); // Emitowanie obiektu Account

  openDeleteAccountDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
      autoFocus: false,
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.account
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deleted' && this.account) {
        this.accountDeleted.emit(this.account.id); // Emituj zdarzenie usunięcia
      }
    });
  }

  openUpdateAccountDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if (this.account) {
      const dialogRef = this.dialog.open(UpdateAccountDialogComponent, {
        autoFocus: false,
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: this.account
      });
  
      dialogRef.afterClosed().subscribe((updatedAccount: Account | null) => {
        if (updatedAccount) {
          // Emitowanie zaktualizowanego konta
          this.accountUpdated.emit(updatedAccount);
        }
      });
    }
  }
  
}
