import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
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

  openDialogWithAddAccountForm(enterAnimationDuration: string, exitAnimationDuration: string): void {

    this.dialog.open(AddAccountDialogComponent, {
      autoFocus: false,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
