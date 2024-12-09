import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.css'
})
export class AccountSummaryComponent {

  @Input() accountsTotalSum: number = 0;

}
