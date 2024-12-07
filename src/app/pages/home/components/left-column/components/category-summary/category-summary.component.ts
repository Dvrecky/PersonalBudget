import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CategorySummary } from '../../../../../../models/categorySummary.model';

@Component({
  selector: 'app-category-summary',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './category-summary.component.html',
  styleUrl: './category-summary.component.css'
})
export class CategorySummaryComponent {

  @Input() categorySummary: CategorySummary[] | undefined;

}
