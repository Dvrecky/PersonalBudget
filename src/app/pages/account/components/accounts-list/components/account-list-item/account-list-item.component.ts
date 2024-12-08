import { Component, Input } from '@angular/core';
import { Account } from '../../../../../../models/account.model';

@Component({
  selector: 'app-account-list-item',
  standalone: true,
  imports: [],
  templateUrl: './account-list-item.component.html',
  styleUrl: './account-list-item.component.css'
})
export class AccountListItemComponent {

  @Input() account: Account | undefined;

}
