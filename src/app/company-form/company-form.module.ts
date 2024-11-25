import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyFormComponent } from './company-form.component';

@NgModule({
  declarations: [CompanyFormComponent],
  imports: [
    CommonModule,        
    FormsModule,         
    ReactiveFormsModule,  
  ],
  exports: [
    CompanyFormComponent 
  ]
})
export class CompanyFormModule { }
