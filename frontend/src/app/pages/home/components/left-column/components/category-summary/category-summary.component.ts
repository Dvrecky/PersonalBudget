import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CategorySummary } from '../../../../../../models/categorySummary.model';
import {MatListModule} from '@angular/material/list';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-category-summary',
  standalone: true,
  imports: [MatCardModule, MatListModule, NgStyle],
  templateUrl: './category-summary.component.html',
  styleUrl: './category-summary.component.css'
})
export class CategorySummaryComponent {

  @Input() categorySummary: CategorySummary[] = [];

}
