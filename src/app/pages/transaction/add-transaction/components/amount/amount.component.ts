import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-amount',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.css'
})
export class AmountComponent {

}
