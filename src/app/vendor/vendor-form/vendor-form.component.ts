
import { Component, OnInit } from '@angular/core';
////import { Vendor } from '../models/vendor.model';
import { VendorService } from '../vendor.service';
//import { NgForm } from '@angular/forms'; // Import NgForm
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../shared/validation.service';
@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css'],
})
export class VendorFormComponent implements OnInit {
  vendorForm!: FormGroup;
 
  constructor(
    private vendorService: VendorService,
    private validationService: ValidationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.vendorForm = this.fb.group({
      companyName: [  '', [Validators.required, this.validationService.validateCompanyName],],
      phone: ['', [Validators.required, this.validationService.validatePhone]],
      email: ['', [Validators.required, this.validationService.validateEmail]],
      gstTreatment: [''],
      gstin: ['', [Validators.required, this.validationService.validateGSTIN]],
      pan: ['', [Validators.required, this.validationService.validatePAN]],
      // tin: ['', [Validators.required, this.validationService.validateTIN]],
      vat: ['', [Validators.required, this.validationService.validateVAT]],
      website: ['', this.validationService.validateWebsite], // Optional field
      vendorCode: [''],
      // vat: ['', [Validators.required, this.validationService.validateVAT]],
      //vat: ['', [Validators.required, this.validationService.validateVAT]],
      useAsClient: [false], // Checkbox field
      useForDispatch: [false], // Checkbox field
    });
  }

  onSubmit(): void {
    // Check if the form is valid
    this.validateAllFields();
    if (this.vendorForm.invalid) {
      // Mark all controls as touched to display validation error
      return;
    }

    // Proceed with the submission if the form is valid
    this.vendorService.addVendor(this.vendorForm.value).subscribe(() => {
      // Show an alert after data is saved
      alert('Vendor added successfully!');

      // Reset the form
      this.vendorForm.reset();
    });
  }

  private validateAllFields(): void {
    Object.keys(this.vendorForm.controls).forEach((field) => {
      const control = this.vendorForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
