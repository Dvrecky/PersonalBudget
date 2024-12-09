import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import {Category} from '../../../../../models/category.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [MatRadioModule, FormsModule],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() categoryChange = new EventEmitter();


  ngOnInit() {
    console.log(this.categories);
  }

  onCategoryChange(selectedCategoryId: number): void {
    this.categoryChange.emit(selectedCategoryId);
  }
}
