import {ChangeDetectionStrategy, Component, EventEmitter, Output, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-amount',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.css'
})
export class AmountComponent {
  @Output() amountChange = new EventEmitter();
  amount: number | null = null;

  onChangeAmount(amount: number) {
    this.amountChange.emit(amount);
  }
}
