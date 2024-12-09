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


@Component({
  selector: 'app-add-account-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './add-account-dialog.component.html',
  styleUrl: './add-account-dialog.component.css'
})
export class AddAccountDialogComponent {

  readonly dialogRef = inject(MatDialogRef<AddAccountDialogComponent>);

  private formBuilder = inject(FormBuilder);

  constructor(private accountService: AccountService){}

  addAccountForm = this.formBuilder.group({
    name: ['', Validators.required],
    balance: ['', Validators.required]
  });

  handleSubmit(): void {
    console.log(`Acccount name: ${this.addAccountForm.value.name}, Initial balance: ${this.addAccountForm.value.balance}`);
    
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
