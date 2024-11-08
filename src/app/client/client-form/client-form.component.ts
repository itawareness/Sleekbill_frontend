// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ClientService } from '../client.service';
// import { Client } from '../models/client.model';
// import { ValidationService } from '../../shared/validation.service';

// @Component({
//   selector: 'app-client-form',
//   templateUrl: './client-form.component.html',
//   styleUrls: ['./client-form.component.css'],
// })
// export class ClientFormComponent {
//   client: Client = {
//     id: 0,
//     companyName: '',
//     phone: '',
//     email: '',
//     gstTreatment: '',
//     gstin: '',
//     pan: '',
//     tin: '',
//     vat: '',
//     website: '',
//     useAsVendor: false,
//   };

//   constructor(private clientService: ClientService,
//     private validationService: ValidationService
//   ) {}

//   onSubmit(form: NgForm): void {
//     // Mark all fields as touched to display validation errors
//     this.validateAllFields(form);

//     // Check if the form is valid
//     if (form.invalid) {
//       return; // Prevent submission if invalid
//     }

//     // Proceed with the submission if the form is valid
//     this.clientService.addClient(this.client).subscribe(() => {
//       // Show an alert after data is saved
//       alert('Client added successfully!');

//       // Reset the form
//       form.resetForm();
//     });
//   }

//   private validateAllFields(form: NgForm): void {
//     Object.keys(form.controls).forEach((field) => {
//       const control = form.controls[field];
//       control.markAsTouched({ onlySelf: true });
//     });
//   }







//   validateCompanyName(control: any) {
//     const companyName = control.value;
//     if (!companyName) {
//       return { required: true };
//     } else if (!/^[a-zA-Z\s-]+$/.test(companyName)) {
//       return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
//     }
//     return null;
//   }

//   validatePhone(control: any) {
//     const phone = control.value;
//     if (!phone) {
//       return { required: true };
//     } else if (!/^\d{10}$/.test(phone)) {
//       return { pattern: true }; // Phone number must be exactly 10 digits
//     }
//     return null;
//   }

//   validateEmail(control: any) {
//     const email = control.value;
//     if (!email) {
//       return { required: true };
//     } else if (!/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|rediffmail\.com)$/.test(email)) {
//       return { pattern: true }; // Only specific email domains allowed
//     }
//     return null;
//   }

//   validateGSTIN(control: any) {
//     const gstin = control.value;
//     if (!gstin) {
//       return { required: true };
//     } else if (!/^[0-9A-Z]{15}$/.test(gstin)) {
//       return { pattern: true }; // Invalid GSTIN format
//     }
//     return null;
//   }

//   validatePAN(control: any) {
//     const pan = control.value;
//     if (!pan) {
//       return { required: true };
//     } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
//       return { pattern: true }; // Invalid PAN format
//     }
//     return null;
//   }

//   validateTIN(control: any) {
//     const tin = control.value;
//     if (!tin) {
//       return { required: true };
//     } else if (!/^\d{11}$/.test(tin)) {
//       return { pattern: true }; // TIN must be exactly 11 digits
//     }
//     return null;
//   }

//   validateVAT(control: any) {
//     const vat = control.value;
//     if (!vat) {
//       return { required: true };
//     } else if (!/^\d{2}-\d{10}-VAT$/.test(vat)) {
//       return { pattern: true }; // VAT must be numeric
//     }
//     return null;
//   }

//   validateWebsite(control: any) {
//     const website = control.value;
//     if (website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/
// .test(website)) {
//       return { pattern: true }; // Invalid website format
//     }
//     return null;
//   }
//}

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

  // onSubmit(): void {
  //   // Mark all fields as touched to display validation errors
  //   this.validateAllFields();

  //   // Check if the form is valid
  //   if (this.clientForm.invalid) {
  //     return; // Prevent submission if invalid
  //   }

  //   // Proceed with the submission if the form is valid
  //   this.clientService.addClient(this.clientForm.value).subscribe(() => {
  //     // Show an alert after data is saved
  //     alert('Client added successfully!');

  //     // Reset the form
  //     this.clientForm.reset();
  //   });
  // }



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
