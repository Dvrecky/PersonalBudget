import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../../../../../../../models/account.model';
import { AccountService } from '../../../../../../../services/account.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-account-dialog',
  standalone: true,
  imports: [MatDialogModule,     MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,],
  templateUrl: './update-account-dialog.component.html',
  styleUrl: './update-account-dialog.component.css'
})
export class UpdateAccountDialogComponent {

  readonly dialogRef = inject(MatDialogRef<UpdateAccountDialogComponent>);
  private formBuilder = inject(FormBuilder);
  private accountService = inject(AccountService);

  // Dodaj domyślną inicjalizację dla `data`
  constructor(@Inject(MAT_DIALOG_DATA) public data: Account) {
    console.log('Received data in dialog:', data);  // Powinno wypisać dane przekazane do dialogu
  }

  // Formularz będzie inicjalizowany w metodzie ngOnInit, aby upewnić się, że dane są dostępne.
  updateAccountForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('.*[a-zA-Z]+.*')]],
    balance: [0, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+$")]]
  });

  ngOnInit(): void {
    // Ustawiamy początkowe wartości formularza, gdy dane są już przekazane
    if (this.data) {
      this.updateAccountForm.patchValue({
        name: this.data.name,
        balance: this.data.balance
      });
    }
  }

  updateAccount(): void {

    if (!this.data) {
      console.error('No data received in dialog');
      return;
    }

    if (this.updateAccountForm.valid) {
      const updatedAccount: Account = {
        ...this.data,
        id: this.data.id,
        name: this.updateAccountForm.value.name!,
        balance: Number(this.updateAccountForm.value.balance!)
      };


      this.accountService.updateAccount(updatedAccount).subscribe(
        (response: Account) => {
          this.dialogRef.close(response); // Zamknij dialog i zwróć zaktualizowane konto
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
