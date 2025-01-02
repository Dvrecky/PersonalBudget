import {Component, Input} from '@angular/core';
import { MatRadioModule} from '@angular/material/radio';
import {Category} from '../../../../../models/category.model';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [MatRadioModule, FormsModule, ReactiveFormsModule],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent {
  @Input() categories: Category[] = [];
  @Input() formGroup!: FormGroup;
}
