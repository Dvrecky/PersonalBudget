import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {Account} from '../../../../../models/account.model';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-account-selector',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSelectorComponent implements OnInit {
  @Input() accounts: Account[] = [];
  @Input() selectedAccountId: number | null = null;
  @Input() formGroup!: FormGroup;


  ngOnInit() {

    if (!this.selectedAccountId && this.accounts.length > 0) {
      this.selectedAccountId = this.accounts[0].id; // Ustaw domyślne konto, jeśli potrzebne
    }
  }
}
