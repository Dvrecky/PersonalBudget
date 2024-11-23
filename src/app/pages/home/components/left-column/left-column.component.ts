import { Component } from '@angular/core';
import { AccountBudgetComponent } from "./components/account-budget/account-budget.component";

@Component({
  selector: 'app-left-column',
  standalone: true,
  imports: [AccountBudgetComponent],
  templateUrl: './left-column.component.html',
  styleUrl: './left-column.component.css'
})
export class LeftColumnComponent {

}
