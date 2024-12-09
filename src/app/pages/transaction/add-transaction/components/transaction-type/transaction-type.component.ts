import {Component, EventEmitter, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-type',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatRadioModule],
  templateUrl: './transaction-type.component.html',
  styleUrl: './transaction-type.component.css'
})
export class TransactionTypeComponent {
  @Output() transactionTypeChange = new EventEmitter();

  onTransactionTypeChange(selectedType: string): void {
    this.transactionTypeChange.emit(selectedType);
  }
}
