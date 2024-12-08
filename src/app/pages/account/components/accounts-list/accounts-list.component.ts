import { Component, Input } from '@angular/core';
import { Account } from '../../../../models/account.model';
import {MatCardModule} from '@angular/material/card';
import { AccountListItemComponent } from './components/account-list-item/account-list-item.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [MatCardModule, AccountListItemComponent, MatListModule],
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.css'
})
export class AccountsListComponent{

  @Input() accountsList: Account[] = [];

}
