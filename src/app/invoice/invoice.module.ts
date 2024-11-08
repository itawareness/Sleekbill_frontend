import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceComponent } from './invoice.component';
import { InvoiceService } from './invoice.service';

@NgModule({
  declarations: [
    InvoiceComponent  // Declare the InvoiceComponent
  ],
  imports: [
    CommonModule,        // Common functionalities
    ReactiveFormsModule  // Form functionalities
  ],
  providers: [
    InvoiceService       // Provide the InvoiceService
  ],
  exports: [
    InvoiceComponent      // Export the InvoiceComponent if needed in other modules
  ]
})
export class InvoiceModule { }
