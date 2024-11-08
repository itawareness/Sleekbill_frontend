import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';


// const routes: Routes = [
//   { path: '', redirectTo: 'list', pathMatch: 'full' },
//   { path: 'lists', component: ClientListComponent },
//   { path: 'add', component: ClientFormComponent },
// ];

const routes: Routes = [
  { path: '', component: ItemListComponent }, // Default route for clients
  { path: 'add', component: ItemFormComponent }, // Route for adding a client
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingModule {}
