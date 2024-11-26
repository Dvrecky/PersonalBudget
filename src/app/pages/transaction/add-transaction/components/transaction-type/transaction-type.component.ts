import { Component } from '@angular/core';
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
  transactionType: string | null = null;

}
