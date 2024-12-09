import { Component, Input } from '@angular/core';
import { Account } from '../../../../../../models/account.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-account-list-item',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, CurrencyPipe],
  templateUrl: './account-list-item.component.html',
  styleUrl: './account-list-item.component.css'
})
export class AccountListItemComponent {

  @Input() account: Account | undefined;

}
