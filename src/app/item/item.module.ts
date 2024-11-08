import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemRoutingModule } from './item-routing.module';

@NgModule({
  declarations: [
    ItemFormComponent,
    ItemListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ItemRoutingModule,
  ],
  exports: [
    ItemFormComponent,
    ItemListComponent
  ]
})
export class ItemModule {}
