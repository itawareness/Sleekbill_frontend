// src/app/features/client/client.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import this module
@NgModule({
  declarations: [
    ClientListComponent,
    ClientFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ClientRoutingModule,
    ReactiveFormsModule, 
  ],
})
export class ClientModule {}
