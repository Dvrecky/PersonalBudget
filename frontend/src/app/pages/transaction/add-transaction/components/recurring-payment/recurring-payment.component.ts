import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recurring-payment',
  standalone: true,
  imports: [MatRadioModule],
  templateUrl: './recurring-payment.component.html',
  styleUrl: './recurring-payment.component.css'
})
export class RecurringPaymentComponent {
  @Input() formGroup!: FormGroup;

  readonly dialog = inject(MatDialog);
  selectedFrequency: string = '';
  isRecurring: boolean = false;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { frequency: this.selectedFrequency },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.selectedFrequency = result;
        this.isRecurring = result !== '';
        this.formGroup.patchValue({
          recurring: this.isRecurring,
          recurringPeriod: this.selectedFrequency
        });
      }
    });
  }
}

