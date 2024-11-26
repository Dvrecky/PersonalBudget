import { Component, EventEmitter, Output} from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-switch-transaction-type',
  standalone: true,
  imports: [MatRadioModule],
  templateUrl: './switch-transaction-type.component.html',
  styleUrl: './switch-transaction-type.component.css'
})
export class SwitchTransactionTypeComponent{

  // służy do powiadomienia rodzica o zmianie typu wydatków ('expenses' albo 'incomes')
  @Output() transactionTypeSwitch = new EventEmitter<'expenses' | 'incomes'>();

  onTransactionTypeChange(value: 'expenses' | 'incomes') {
    console.log("Chosen option: " , value);
    this.transactionTypeSwitch.emit(value);
  }
}
