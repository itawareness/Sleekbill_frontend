// src/app/features/vendor/vendor.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { FormsModule } from '@angular/forms';
import { VendorRoutingModule } from './vendor-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; // Import this module
@NgModule({
  declarations: [
    VendorFormComponent,
    VendorFormComponent,
    VendorListComponent,
  
    // other components if any
  ],
  imports: [
    CommonModule,
    FormsModule,
    VendorRoutingModule,
    ReactiveFormsModule
  ]
})
export class VendorModule {}



