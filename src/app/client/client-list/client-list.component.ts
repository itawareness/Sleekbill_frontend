// src/app/features/client/client-list/client-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }


  getClients(): void {
    this.clientService.getClients().subscribe((data: Client[]) => {
      this.clients = data; // Assign the fetched data to clients
    });
  }

  editClient(clientId: number): void {
    console.log(`Edit client with ID: ${clientId}`);
    // Here you can navigate to the edit client page or open a modal
    // For example: this.router.navigate(['/clients/edit', clientId]);
  }

  // deleteClient(clientId: number): void {
  //   console.log(`Delete client with ID: ${clientId}`);
  //   // Call the delete method from your service
  //   this.clientService.deleteClient(clientId).subscribe(() => {
  //     this.getClients(); // Refresh the client list after deletion
  //   });
  // }

  loadClients(): void {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
    });
  }
}
