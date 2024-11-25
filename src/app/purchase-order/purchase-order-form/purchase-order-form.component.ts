
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PurchaseOrderService } from '../purchase-order.service'; 

@Component({
  selector: 'app-purchase-order-form',
  templateUrl: './purchase-order-form.component.html',
  styleUrls: ['./purchase-order-form.component.css']
})
export class PurchaseOrderFormComponent implements OnInit {
  purchaseOrderForm: FormGroup;
  orderDateInvalid: boolean = false;

  constructor(private fb: FormBuilder, private purchaseOrderService: PurchaseOrderService) {
    this.purchaseOrderForm = this.fb.group({
      vendorName: ['', Validators.required],
      orderNumber: ['', Validators.required],
      orderDate: ['', Validators.required],
      validUntil: ['', Validators.required],
      items: this.fb.array([this.createItem()]) 
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
          this.purchaseOrderForm.reset();
        },
        error => {
          console.error('Error saving Purchase Order', error);
        }
      );
    }
  }
}
