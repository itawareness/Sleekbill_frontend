// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { PurchaseOrderService } from '../purchase-order.service';
// import { PurchaseOrder } from '../purchase-order.model';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-purchase-order-form',
//   templateUrl: './purchase-order-form.component.html',
//   styleUrls: ['./purchase-order-form.component.css']
// })
// export class PurchaseOrderFormComponent {
//   purchaseOrderForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private purchaseOrderService: PurchaseOrderService,
//     private router: Router
//   ) {
//     // Initialize the form
//     this.purchaseOrderForm = this.fb.group({
//       vendorName: ['', Validators.required],
//       orderNumber: ['', Validators.required],
//       orderDate: ['', Validators.required],
//       validUntil: ['', Validators.required],
      
//       items: this.fb.array([])  // Initialize an empty FormArray for items
//     });
//   }

//   get items(): FormArray {
//     return this.purchaseOrderForm.get('items') as FormArray;
//   }

//   addItem() {
//     this.items.push(this.fb.group({
//       id: [null],  // ID will be null for new items
//       itemName: ['', Validators.required],
//       description: [''],
//       unit: [''],
//       quantity: [0, Validators.required],
//       price: [0, Validators.required],
//       discount: [0],
//       tax: ['']
//     }));
//   }

//   removeItem(index: number) {
//     this.items.removeAt(index);
//   }

//   onSubmit() {
//     if (this.purchaseOrderForm.valid) {
//       const purchaseOrder: PurchaseOrder = this.purchaseOrderForm.value;
//       this.purchaseOrderService.createPurchaseOrder(purchaseOrder).subscribe(response => {
//         console.log('Purchase order submitted successfully:', response);
//         this.purchaseOrderForm.reset(); // Reset the form
//         this.router.navigate(['/purchase-orders']); // Navigate to the list or desired route
//       }, error => {
//         console.error('Error submitting purchase order:', error);
//       });
//     }
//   }
// }



//2nd code
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PurchaseOrderService } from '../purchase-order.service'; // Import the service

@Component({
  selector: 'app-purchase-order-form',
  templateUrl: './purchase-order-form.component.html',
  styleUrls: ['./purchase-order-form.component.css']
})
export class PurchaseOrderFormComponent implements OnInit {
  purchaseOrderForm: FormGroup;
  orderDateInvalid: boolean = false;

  constructor(private fb: FormBuilder, private purchaseOrderService: PurchaseOrderService) { // Inject the service
    this.purchaseOrderForm = this.fb.group({
      vendorName: ['', Validators.required],
      orderNumber: ['', Validators.required],
      orderDate: ['', Validators.required],
      validUntil: ['', Validators.required],
      items: this.fb.array([this.createItem()]) // Start with one item by default
    });
  }

  ngOnInit(): void {}

  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      description: [''],
      unit: [''],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      discount: [''],
      tax: ['']
    });
  }

  get items(): FormArray {
    return this.purchaseOrderForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  validateOrderDate(): void {
    const orderDate = new Date(this.purchaseOrderForm.get('orderDate')?.value);
    const validUntilDate = new Date(this.purchaseOrderForm.get('validUntil')?.value);
    this.orderDateInvalid = orderDate >= validUntilDate;
  }

  onSubmit(): void {
    if (this.purchaseOrderForm.valid && !this.orderDateInvalid) {
      const purchaseOrderData = this.purchaseOrderForm.value;

      // Call your service to submit the purchase order
      this.purchaseOrderService.createPurchaseOrder(purchaseOrderData).subscribe(
        response => {
          console.log('Purchase Order saved successfully', response);
          window.alert("Purchase Data added successfully!!");
          this.purchaseOrderForm.reset(); // Reset form after submission
        },
        error => {
          console.error('Error saving Purchase Order', error);
        }
      );
    }
  }
}
