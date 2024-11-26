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

  // input jest nie potrzeby, bo nie otrzymuje żadnych danych do wyświetlenia, itp.
  // ten komponent służy tylko do pobrania typu transakcji (i przekazania jej rodzicowi), które mają być wyświetlone w innych komponentach
  // służy do powiadomienia rodzica o zmianie typu wydatków ('expenses' albo 'incomes')
  @Output() transactionTypeSwitch = new EventEmitter<'expenses' | 'incomes'>(); // przyjmuje tylko dwie wartości

  // metoda jest wywoływana w momencie, zmiany w radio-buttons
  onTransactionTypeChange(value: 'expenses' | 'incomes') {
    console.log("Chosen option: " , value); // logi pomocnicze
    this.transactionTypeSwitch.emit(value); // emitowanie zdarzenia do rodzica (przekazuje zaznaczoną wartość)
  }
}
