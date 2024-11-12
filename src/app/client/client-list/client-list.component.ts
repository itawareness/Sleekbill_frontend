import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];           // All clients fetched from the server
  currentPage: number = 0;         // Current page index
  totalClients: number = 0;        // Total number of clients available from the server
  totalPages: number = 0;          // Total pages for pagination
  pageSize: number = 5;            // Number of clients per page
  searchQuery: string = '';        // Search query for filtering clients

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients(); // Load initial clients when component is initialized
  }

  // Load clients from the API (with pagination)
  loadClients(): void {
    this.clientService.getClients(this.currentPage, this.pageSize, this.searchQuery).subscribe((response) => {
      this.clients = response.content; // Set the current page clients
      this.totalClients = response.totalElements; // Set the total number of clients
      this.totalPages = response.totalPages; // Set the total number of pages
    });
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadClients(); // Reload the clients for the next page
    }
  }

  // Go to the previous page
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadClients(); // Reload the clients for the previous page
    }
  }

  // Go to a specific page
  goToPage(page: number): void {
    this.currentPage = page;
    this.loadClients(); // Reload the clients for the specific page
  }

  // Filter clients based on the search query
  filterClients(): void {
    this.currentPage = 0; // Reset to the first page when performing a new search
    this.loadClients(); // Reload the clients with the search query applied
  }

  // Getter to get the currently paginated clients
  get paginatedClients(): Client[] {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.clients.slice(start, end); // Slice the filtered clients array for the current page
  }
}







// import { Component, OnInit } from '@angular/core';
// import { ClientService } from '../client.service';
// import { Client } from '../models/client.model';

// @Component({
//   selector: 'app-client-list',
//   templateUrl: './client-list.component.html',
//   styleUrls: ['./client-list.component.css'],
// })
// export class ClientListComponent implements OnInit {
//   clients: Client[] = [];
//   currentPage: number = 0;
//   totalPages: number = 0;
//   totalElements: number = 0;
//   pageSize: number = 5;  // Adjust this value as needed
//   searchQuery: string = '';  // Store search query

//   constructor(private clientService: ClientService) {}

//   ngOnInit(): void {
//     this.loadClients(); // Load first page of clients initially
//   }

//   // Load clients based on pagination and search query
//   loadClients(): void {
//     this.clientService.getClients(this.currentPage, this.pageSize, this.searchQuery).subscribe((response) => {
//       this.clients = response.content;       // Clients for the current page
//       this.totalPages = response.totalPages; // Total number of pages
//       this.totalElements = response.totalElements; // Total number of records
//     });
//   }

//   // Go to the next page
//   nextPage(): void {
//     if (this.currentPage < this.totalPages - 1) {
//       this.currentPage++;
//       this.loadClients();
//     }
//   }

//   // Go to the previous page
//   prevPage(): void {
//     if (this.currentPage > 0) {
//       this.currentPage--;
//       this.loadClients();
//     }
//   }

//   // Go to a specific page
//   goToPage(page: number): void {
//     this.currentPage = page;
//     this.loadClients();
//   }

//   // Method to handle search input change
//   onSearchChange(): void {
//     this.currentPage = 0;  // Reset to the first page when searching
//     this.loadClients();  // Reload clients with the search query
//   }
// }
