// // src/app/app-routing.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { InvoiceComponent } from './invoice/invoice.component';
// import { InvoicesListComponent } from './invoices-list/invoices-list.component';

// const routes: Routes = [
//   { path: 'invoice', component: InvoiceComponent },// creating invoice
//   { path: 'invoice/:invoice_Id', component: InvoiceComponent }, // For editing invoice
//   { path: 'invoices-list', component: InvoicesListComponent },// invoice list
//   { path: '', redirectTo: '/invoice', pathMatch: 'full' }, // Default route
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice/invoices-list/invoices-list.component'; // Adjust the path according to your project structure
import { InvoiceEditComponent } from './invoice/invoice-edit/invoice-edit.component'; // Adjust the path according to your project structure
import { InvoiceComponent } from './invoice/invoice.component'; // Adjust the path according to your project structure
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorFormComponent } from './vendor/vendor-form/vendor-form.component';
import { ItemFormComponent } from './item/item-form/item-form.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { PurchaseOrderListComponent } from './purchase-order/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderFormComponent } from './purchase-order/purchase-order-form/purchase-order-form.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CreditNoteFormComponent } from './credit-note/credit-note.component';
import { DebitNoteFormComponent } from './debit-note/debit-note.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [ // Redirect to invoice list
  // Route for the invoice list
  { path: 'add-invoice', component: InvoiceComponent },
  { path: 'invoices-list', component: InvoiceListComponent }, // Route for adding an invoice
  { path: 'edit-invoice/:id', component: InvoiceEditComponent },

  // { path: 'add-items', component: ItemFormComponent},
  // { path: 'items-list', component: ItemListComponent }, 
  { path: 'items', loadChildren: () => import('./item/item.module').then(m => m.ItemModule) }, // Lazy load ItemModule
  { path: 'clients', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) }, // Lazy load ClientModule
  { path: 'vendors', loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule) }, // Lazy load VendorModule
  

  { path: 'purchase-orders', component: PurchaseOrderListComponent },
  { path: 'purchase-orders/new', component: PurchaseOrderFormComponent },
  { path: 'profile', component: CompanyFormComponent },
  { path: 'credit-note', component: CreditNoteFormComponent }, 
  { path: 'debit-note', component: DebitNoteFormComponent }, 
  // // Vendor routes
  //  { path: 'vendors', component: VendorListComponent },
  //  { path: 'vendors/add', component: VendorFormComponent },
  //  { path: 'vendors/edit/:id', component: VendorFormComponent },
  { path: 'items-test', component: ItemsComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' }, // Route for editing an invoice with a specific ID
  //{ path: '**', redirectTo: '/invoices' } // Wildcard route redirects to invoice list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
