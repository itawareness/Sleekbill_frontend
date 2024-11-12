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
  currentPage: number = 0; 
  totalClients: number = 0; 
  totalPages: number = 0; 
  pageSize: number = 5; 
  searchQuery: string = '';

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients(); // Load initial clients when component is initialized
  }


  loadClients(): void {
    // Fetch data from the server
    this.clientService.getClients(this.currentPage, this.pageSize, this.searchQuery).subscribe((response) => {
      this.clients = response.content; 
      this.totalClients = response.totalElements; 
      this.totalPages = response.totalPages; // Total pages available
    });
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadClients(); 
    }
  }

  // Go to the previous page
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadClients(); 
    }
  }

  // Go to a specific page
  goToPage(page: number): void {
    this.currentPage = page;
    this.loadClients(); 
  }


  filterClients(): void {
    this.currentPage = 0; 
    this.loadClients(); 
  }

  // Getter to get the currently paginated clients
  get paginatedClients(): Client[] {
    return this.clients;
  }
}

