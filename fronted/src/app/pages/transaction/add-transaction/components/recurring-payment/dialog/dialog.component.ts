import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatRadioModule,],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  selectedFrequency: string = '';

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedFrequency = data.frequency || '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedFrequency);
  }
}
