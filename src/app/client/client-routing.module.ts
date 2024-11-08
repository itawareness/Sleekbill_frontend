// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class ClientRoutingModule { }


// src/app/features/client/client-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'list', pathMatch: 'full' },
//   { path: 'lists', component: ClientListComponent },
//   { path: 'add', component: ClientFormComponent },
// ];

const routes: Routes = [
  { path: '', component: ClientListComponent }, // Default route for clients
  { path: 'add', component: ClientFormComponent }, // Route for adding a client
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
