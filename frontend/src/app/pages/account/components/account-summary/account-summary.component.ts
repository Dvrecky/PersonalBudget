import { Component, Input } from '@angular/core';
import { PlnPipe } from '../../../../pipes/pln.pipe';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  imports: [PlnPipe],
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.css'
})
export class AccountSummaryComponent {

  @Input() accountsTotalSum: number = 0;

}
