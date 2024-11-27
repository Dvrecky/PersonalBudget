import { Component, Output, Input, EventEmitter } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CategoryChart } from '../../../../../../models/categoryChart.model';

@Component({
  selector: 'app-category-chart',
  standalone: true,
  imports: [MatCardModule, MatButtonToggleModule],
  templateUrl: './category-chart.component.html',
  styleUrl: './category-chart.component.css'
})
export class CategoryChartComponent {

  // gotowe dane do wyświetlenia wykresu, będą przekazywane z rodzica
  @Input() categoryChartData: CategoryChart | undefined;
  // służy do emitowania zdarzenia do rodzica, informując go o zmianie okresu według, którego ma być wyświetlany wykres
  @Output() periodChange = new EventEmitter<"year" | "month" | "week" | "day">();

  onPeriodChange(period: "year" | "month" | "week" | "day") {
      console.log(period);
      // wysłanie zdarzenia do rodzica
      this.periodChange.emit(period);
  }

}
