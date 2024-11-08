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

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.getVendors();
  }

  // Fetch the list of vendors from the service
  getVendors(): void {
    this.vendorService.getVendors().subscribe(
      (data: Vendor[]) => {
        this.vendors = data;
      },
      (error) => {
        console.log('Error fetching vendor list', error);
      }
    );
  }

  // Method to edit a vendor (by ID)
  editVendor(id: number): void {
    // Logic to navigate to the edit page
  }

  // Method to delete a vendor (by ID)
  deleteVendor(id: number): void {
    this.vendorService.deleteVendor(id).subscribe(
      (response) => {
        console.log('Vendor deleted successfully');
        this.getVendors(); // Refresh the list after deletion
      },
      (error) => {
        console.log('Error deleting vendor', error);
      }
    );
  }
}
