
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { ClientFormComponent } from './features/client/client-form/client-form.component'; // Adjust path as necessary
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component'; 
import { InvoiceComponent } from './invoice/invoice.component'; 
import { InvoiceEditComponent } from './invoice/invoice-edit/invoice-edit.component'; 
import { InvoiceListComponent } from './invoice/invoices-list/invoices-list.component'; 
import { ItemModule } from './item/item.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { ValidationService } from './shared/validation.service';
import { ReactiveFormsModule } from '@angular/forms'; // Import this module
import { AppRoutingModule } from './app.routes';
import { CommonModule } from '@angular/common';
import { CompanyFormModule } from './company-form/company-form.module';
import { CreditNoteFormComponent } from './credit-note/credit-note.component';
import { DebitNoteFormComponent } from './debit-note/debit-note.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';




@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    InvoiceEditComponent,
    InvoiceListComponent,
    CreditNoteFormComponent,
    DebitNoteFormComponent,
    DynamicFormComponent
    //ClientFormComponent // Declare your component here
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule,
    ReactiveFormsModule, // Add it to imports array
    ItemModule,
    PurchaseOrderModule,
    CompanyFormModule
    
  ],
  providers: [ValidationService],
  bootstrap: [AppComponent] 
})
export class AppModule { }
