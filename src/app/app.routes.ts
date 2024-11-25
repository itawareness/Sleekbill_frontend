
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice/invoices-list/invoices-list.component'; 
import { InvoiceEditComponent } from './invoice/invoice-edit/invoice-edit.component';
import { InvoiceComponent } from './invoice/invoice.component';

import { PurchaseOrderListComponent } from './purchase-order/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderFormComponent } from './purchase-order/purchase-order-form/purchase-order-form.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CreditNoteFormComponent } from './credit-note/credit-note.component';
import { DebitNoteFormComponent } from './debit-note/debit-note.component';
import { ItemsComponent } from './items/items.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [ 
 
  { path: 'add-invoice', component: InvoiceComponent },
  { path: 'invoices-list', component: InvoiceListComponent },
  { path: 'edit-invoice/:id', component: InvoiceEditComponent },


  { path: 'items', loadChildren: () => import('./item/item.module').then(m => m.ItemModule) }, 
  { path: 'clients', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'vendors', loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule) }, 
  

  { path: 'purchase-orders', component: PurchaseOrderListComponent },
  { path: 'purchase-orders/new', component: PurchaseOrderFormComponent },
  { path: 'profile', component: CompanyFormComponent },
  { path: 'credit-note', component: CreditNoteFormComponent }, 
  { path: 'debit-note', component: DebitNoteFormComponent }, 
  { path: 'dashboard', component: DashboardComponent }, 

  { path: 'items-test', component: ItemsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }