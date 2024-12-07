import { Component, Input } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import {Category} from '../../../../../models/category.model';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [MatRadioModule],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent {

  @Input() categories: Category[] = [];

  ngOnInit() {
    console.log(this.categories);
  }
}
