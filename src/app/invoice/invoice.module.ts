import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceComponent } from './invoice.component';
import { InvoiceService } from './invoice.service';

@NgModule({
  declarations: [
    InvoiceComponent 
  ],
  imports: [
    CommonModule,        
    ReactiveFormsModule  
  ],
  providers: [
    InvoiceService       
  ],
  exports: [
    InvoiceComponent     
  ]
})
export class InvoiceModule { }
