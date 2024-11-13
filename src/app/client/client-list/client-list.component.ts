import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../models/client.model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

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
    this.clientService.getClients(this.currentPage, this.pageSize, this.searchQuery).subscribe((response) => {
      this.clients = response.content;
      this.totalClients = response.totalElements;
      this.totalPages = response.totalPages;

      // Adjust currentPage if the current page has no clients after deletion
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages - 1; // Go to last available page
        if (this.currentPage < 0) {
          this.currentPage = 0; // Prevent negative page index
        }
        this.loadClients(); // Reload the new page
      }
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

  // Delete a single client
  deleteClient(clientId: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(clientId).subscribe(() => {
        this.loadClients();
      });
    }
  }

 // Delete selected clients (bulk delete)
 deleteSelectedClients(): void {
  const selectedClients = this.clients.filter(client => client.selected);
  // Show SweetAlert confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete them!',
  }).then((result) => {
    if (result.isConfirmed) {
      const clientIds = selectedClients.map(client => client.id);
      this.clientService.deleteSelectedClients(clientIds).subscribe(() => {
        this.loadClients(); // Reload clients after deletion
        Swal.fire(
          'Deleted!',
          'The selected clients have been deleted.',
          'success'
        );
      });
    }
  });
}

  // Check if any clients are selected
  isAnyClientSelected(): boolean {
    return this.clients.some(client => client.selected);
  }

  // Check if all clients are selected
  isAllSelected(): boolean {
    return this.clients.length > 0 && this.clients.every(client => client.selected);
  }

  // Toggle select all clients
  toggleSelectAll(event: any): void {
    const isChecked = event.target.checked;
    this.clients.forEach(client => client.selected = isChecked);
  }

  // Handle change in individual client selection
  onSelectionChange(): void {
    // This will handle when a client is selected or deselected.
  }



  downloadExcel() {
    this.clientService.exportClientsToExcel(this.currentPage, this.pageSize).subscribe(response => {
      // Create a Blob from the Excel data
      const blob = response;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'clients.xlsx';
      a.click();
    });
  }
}
