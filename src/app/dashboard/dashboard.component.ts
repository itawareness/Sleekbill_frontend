import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor() {
    // Register Chart.js modules
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadFinancialGraph();
  }

  loadFinancialGraph(): void {
    const ctx = (document.getElementById('financialGraph') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['2024-09-01', '2024-09-09', '2024-09-19', '2024-10-14', '2024-11-18'],
          datasets: [
            {
              label: 'Invoiced',
              data: [0, 100000, 200000, 300000, 242480],
              borderColor: 'green',
              borderWidth: 2,
              fill: false
            },
            {
              label: 'Paid',
              data: [0, 5000, 15000, 2294, 2294],
              borderColor: 'blue',
              borderWidth: 2,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    }
  }
}
