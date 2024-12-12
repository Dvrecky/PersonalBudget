import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatRadioModule} from '@angular/material/radio';
import {Category} from '../../../../../models/category.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [MatRadioModule, FormsModule],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent {
  @Input() categories: Category[] = [];
  @Output() categoryChange = new EventEmitter();


  onCategoryChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedCategoryId = parseInt(inputElement.value, 10);
    this.categoryChange.emit(selectedCategoryId);
  }
}
