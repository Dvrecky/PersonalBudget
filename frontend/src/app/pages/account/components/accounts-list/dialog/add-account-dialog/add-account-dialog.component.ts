import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { inject } from '@angular/core';
import { Account } from '../../../../../../models/account.model';
import { AccountService } from '../../../../../../services/account.service';
import { CreateAccount } from '../../../../../../models/createAccount.model';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-account-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './add-account-dialog.component.html',
  styleUrl: './add-account-dialog.component.css'
})
export class AddAccountDialogComponent {

  readonly dialogRef = inject(MatDialogRef<AddAccountDialogComponent>);

  private formBuilder = inject(FormBuilder);

  private accountService = inject(AccountService);

  addAccountForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('.*[a-zA-Z]+.*')]],
    balance: [0, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+$")]]
  });

  handleSubmit(): void {
    console.log(`Acccount name: ${this.addAccountForm.value.name}, Initial balance: ${this.addAccountForm.value.balance}`);
    
    if(this.addAccountForm.valid) {
      const newAccountData: CreateAccount = {
        name: this.addAccountForm.value.name!,
        balance: Number(this.addAccountForm.value.balance!)
      };

      this.accountService.addAccount(newAccountData).subscribe(
        (response: Account) => {
          console.log(response);
        },
            (error: HttpErrorResponse) => {
              alert(error.message)
            }
      )
    }

    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
