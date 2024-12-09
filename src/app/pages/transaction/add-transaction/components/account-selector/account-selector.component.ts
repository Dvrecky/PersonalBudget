import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {Account} from '../../../../../models/account.model';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-account-selector',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, FormsModule],
  templateUrl: './account-selector.component.html',
  styleUrl: './account-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSelectorComponent implements OnInit {
  @Input() accounts: Account[] = [];
  @Output() accountChange = new EventEmitter();

  selectedAccountId: number | null = null;

  ngOnInit() {
    console.log(this.accounts);
  }

  onAccountChange(): void {
    this.accountChange.emit(this.selectedAccountId);
  }

}
