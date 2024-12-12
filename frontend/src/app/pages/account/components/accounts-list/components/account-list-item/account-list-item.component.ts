import { Component, inject, Input } from '@angular/core';
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


@Component({
  selector: 'app-account-list-item',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, PlnPipe],
  templateUrl: './account-list-item.component.html',
  styleUrl: './account-list-item.component.css'
})
export class AccountListItemComponent {

  readonly dialog = inject(MatDialog);
  @Input() account: Account | undefined;

  openDeleteAccountDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteAccountDialogComponent, {
      autoFocus: false,
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.account
    })
  }

}
