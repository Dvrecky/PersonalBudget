import { Component } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [MatRadioModule],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent {

}
