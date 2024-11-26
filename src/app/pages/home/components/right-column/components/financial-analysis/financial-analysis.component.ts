import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-financial-analysis',
  standalone: true,
  imports: [],
  templateUrl: './financial-analysis.component.html',
  styleUrl: './financial-analysis.component.css'
})
export class FinancialAnalysisComponent implements OnInit{

    constructor() { }

    ngOnInit(): void {
        // Tworzenie wykresu po załadowaniu komponentu
        const ctx = document.getElementById('financialChart') as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'bar', // Typ wykresu (słupkowy)
          data: {
            labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec'], // Oznaczenia osi X
            datasets: [{
              label: 'Przychody',
              data: [5000, 4000, 3500, 4600, 5200, 6000], // Przychody
              backgroundColor: 'rgba(76, 175, 80, 0.5)', // Kolor tła słupków
              borderColor: 'rgba(76, 175, 80, 1)', // Kolor granicy
              borderWidth: 1
            }, {
              label: 'Wydatki',
              data: [2000, 1500, 1800, 1700, 1600, 1900], // Wydatki
              backgroundColor: 'rgba(255, 87, 34, 0.5)', // Kolor tła słupków
              borderColor: 'rgba(255, 87, 34, 1)', // Kolor granicy
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,  // Dopasowanie wykresu do rozmiaru ekranu
            scales: {
              y: {
                beginAtZero: true // Skala Y zaczyna się od 0
              }
            }
          }
        });
      }

   filterBy(period: string) {
      console.log(`Filtruj dla okresu: ${period}`);
      // Logika filtrowania transakcji w zależności od wybranego okresu.
    }
}
