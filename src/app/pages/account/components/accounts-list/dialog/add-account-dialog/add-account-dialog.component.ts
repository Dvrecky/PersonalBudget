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
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-account-dialog',
  standalone: true,
  imports: [ MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-account-dialog.component.html',
  styleUrl: './add-account-dialog.component.css'
})
export class AddAccountDialogComponent {

  addAccountForm = new FormGroup({
    name: new FormControl(''),
    balance: new FormControl('')
  });

}
