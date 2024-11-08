import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseOrderFormComponent } from './purchase-order-form/purchase-order-form.component';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';

@NgModule({
  declarations: [

    PurchaseOrderFormComponent,
    PurchaseOrderListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PurchaseOrderFormComponent,
    PurchaseOrderListComponent
  ]
})
export class PurchaseOrderModule { }





