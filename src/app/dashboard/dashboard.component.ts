import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ClientService } from '../client/client.service';
import { VendorService } from '../vendor/vendor.service';
import { ItemService } from '../item/item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  clientCount: number = 0;
  vendorCount: number = 0;
  itemCount: number = 0;
  constructor(private clientService: ClientService,private vendorService: VendorService,private itemService: ItemService) {
    // Register Chart.js modules
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadFinancialGraph();
    this.loadClientCount();
    this.loadVendorCount();
    this.loadItemCount();
  }

   
  loadClientCount(): void {
    this.clientService.getClientCount().subscribe((count) => {
      this.clientCount = count;
    });
  }
     
  loadVendorCount(): void {
    this.vendorService.getVendorCount().subscribe((count) => {
      this.vendorCount = count;
    });
  }


       
  loadItemCount(): void {
    this.itemService.getItemCount().subscribe((count) => {
      this.itemCount = count;
    });
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
