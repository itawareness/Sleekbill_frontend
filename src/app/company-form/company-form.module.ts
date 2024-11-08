import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyFormComponent } from './company-form.component';

@NgModule({
  declarations: [CompanyFormComponent],
  imports: [
    CommonModule,         // Provides common directives like ngIf, ngFor
    FormsModule,         // Provides support for template-driven forms
    ReactiveFormsModule,  // Provides support for reactive forms
  ],
  exports: [
    CompanyFormComponent  // Export the component to be used in other modules
  ]
})
export class CompanyFormModule { }
