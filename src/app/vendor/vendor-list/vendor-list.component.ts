import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Vendor } from '../models/vendor.model';

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
}
