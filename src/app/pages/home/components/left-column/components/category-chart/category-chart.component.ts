import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CategoryChart } from '../../../../../../models/categoryChart.model';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-category-chart',
  standalone: true,
  imports: [MatCardModule, MatButtonToggleModule],
  templateUrl: './category-chart.component.html',
  styleUrl: './category-chart.component.css'
})
export class CategoryChartComponent implements OnInit{

  // gotowe dane do wyświetlenia wykresu, będą przekazywane z rodzica
  @Input() categoryChartData: undefined;
  // służy do emitowania zdarzenia do rodzica, informując go o zmianie okresu według, którego ma być wyświetlany wykres
  @Output() periodChange = new EventEmitter<"year" | "month" | "week" | "day">();

  // dane = {
  //   labels: [
  //     'Red',
  //     'Blue',
  //     'Yellow'
  //   ],
  //   datasets: [{
  //     label: 'My First Dataset',
  //     data: [300, 50, 100],
  //     backgroundColor: [
  //       'rgb(255, 99, 132)',
  //       'rgb(54, 162, 235)',
  //       'rgb(255, 205, 86)'
  //     ],
  //     hoverOffset: 4
  //   }]
  // };

  // config: any = {
  //   type: 'doughnut',
  //   data: this.dane,
  // };

  // chart: any;

  ngOnInit(): void {
    // this.chart = new Chart('CategoryChart', this.config);
  }

  onPeriodChange(period: "year" | "month" | "week" | "day") {
      console.log(period);
      // wysłanie zdarzenia do rodzica
      this.periodChange.emit(period);
  }

}
