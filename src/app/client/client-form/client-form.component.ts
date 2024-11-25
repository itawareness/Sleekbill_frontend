
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { ValidationService } from '../../shared/validation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private clientService: ClientService,
    private validationService: ValidationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.clientForm = this.fb.group({
      companyName: ['', [Validators.required, this.validationService.validateCompanyName]],
      phone: ['', [Validators.required, this.validationService.validatePhone]],
      email: ['', [Validators.required, this.validationService.validateEmail]],
      gstTreatment: [''],
      gstin: ['', [Validators.required, this.validationService.validateGSTIN]],
      pan: ['', [Validators.required, this.validationService.validatePAN]],
      tin: ['', [Validators.required, this.validationService.validateTIN]],
      vat: ['', [Validators.required, this.validationService.validateVAT]],
      website: ['', this.validationService.validateWebsite], // Optional field
      useAsVendor: [false] // Checkbox field
    });
  }


onSubmit(): void {
    // Mark all fields as touched to display validation errors
    this.validateAllFields();

    // Check if the form is valid
    if (this.clientForm.invalid) {
        return; // Prevent submission if invalid
    }

    // Proceed with the submission if the form is valid
    this.clientService.addClient(this.clientForm.value).subscribe(() => {
        // Show a SweetAlert after data is saved
        Swal.fire({
            title: 'Success!',
            text: 'Client added successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            width: '400px', // Optional: Set a custom width
        }).then(() => {
            // Reset the form after the alert is closed
            this.clientForm.reset();
        });
    }, error => {
        console.error('Error adding client:', error);
        Swal.fire({
            title: 'Error!',
            text: 'There was an error adding the client.',
            icon: 'error',
            confirmButtonText: 'OK',
            width: '400px', // Optional: Set a custom width for error alert
        });
    });
}


  private validateAllFields(): void {
    Object.keys(this.clientForm.controls).forEach((field) => {
      const control = this.clientForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
