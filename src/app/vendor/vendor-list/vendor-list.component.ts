import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Vendor } from '../models/vendor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[] = []; 
  currentPage: number = 0; 
  totalVendors: number = 0;
  totalPages: number = 0; 
  pageSize: number = 5; 
  searchQuery: string = ''; 

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.loadVendors();
  }


  loadVendors(): void {
    this.vendorService.getVendors(this.currentPage, this.pageSize, this.searchQuery).subscribe((response) => {
      this.vendors = response.content; 
      this.totalVendors = response.totalElements; 
      this.totalPages = response.totalPages;

if(this.vendors.length==0 && this.currentPage > 0){
  this.currentPage--;
  this.loadVendors();
}
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadVendors(); 
    }
  }


  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadVendors();
    }
  }


  goToPage(page: number): void {
    this.currentPage = page;
    this.loadVendors(); 
  }


  filterVendors(): void {
    this.currentPage = 0; 
    this.loadVendors(); 
  }


  get paginatedVendors(): Vendor[] {
    return this.vendors;
  }



 // Delete selected clients (bulk delete)
 deleteSelectedVendors(): void {
  const selectedVendors = this.vendors.filter(vendor => vendor.selected);
  // Show SweetAlert confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete them!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Filter out undefined ids
      const vendorIds = selectedVendors
        .map(vendor => vendor.id)
        .filter((id): id is number => id !== undefined);  // Ensures `vendorIds` is of type `number[]`
      
      console.log('Vendor IDs:', vendorIds);  // For debugging

      this.vendorService.deleteSelectedVendors(vendorIds).subscribe({
        next: () => {
          this.loadVendors(); // Reload vendors after deletion
          Swal.fire('Deleted!', 'The selected Vendor(s) have been deleted.', 'success');
        },
        error: (err) => {
          Swal.fire('Error!', 'There was an issue deleting the selected vendors. Please try again later.', 'error');
          console.error('Error deleting vendors:', err);  // Log error
        }
      });
    }
  });
}




  // Check if any clients are selected
  isAnyVendorSelected(): boolean {
    return this.vendors.some(vendor => vendor.selected);
  }

  // Check if all clients are selected
  isAllSelected(): boolean {
    return this.vendors.length > 0 && this.vendors.every(vendor => vendor.selected);
  }

  // Toggle select all clients
  toggleSelectAll(event: any): void {
    const isChecked = event.target.checked;
    this.vendors.forEach(vendor => vendor.selected = isChecked);
  }

  // Handle change in individual client selection
  onSelectionChange(): void {
    // This will handle when a client is selected or deselected.
  }

// Assuming `clients` is the list of clients
getSelectedCount(): number {
  return this.vendors.filter(vendor => vendor.selected).length;
}

  downloadExcel() {
    this.vendorService.exportVendorToExcel(this.currentPage, this.pageSize).subscribe(response => {
      // Create a Blob from the Excel data
      const blob = response;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'vendors.xlsx';
      a.click();
    });
  }

}
