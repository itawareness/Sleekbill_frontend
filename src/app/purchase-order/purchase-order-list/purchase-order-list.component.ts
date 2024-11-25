import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from '../purchase-order.service';
import { PurchaseOrder } from '../purchase-order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.css']
})
export class PurchaseOrderListComponent implements OnInit {

  purchaseOrders: PurchaseOrder[]=[];

  constructor(private purchaseOrderService: PurchaseOrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchPurchaseOrders();
  }

  fetchPurchaseOrders() {
    this.purchaseOrderService.getAllPurchaseOrders().subscribe(data => {
      this.purchaseOrders = data;
    });
  }

  deletePurchaseOrder(id: number): void {
   
    const confirmation = window.confirm('Do you want to delete this purchase order?');
    if (confirmation) {
        this.purchaseOrderService.deletePurchaseOrder(id).subscribe(() => {
            this.fetchPurchaseOrders(); 
        }, error => {
            console.error('Error deleting invoice:', error);
        });
    }
}


  editPurchaseOrder(id: number) {
    this.router.navigate([`/purchase-orders/edit/${id}`]);
  }
}
