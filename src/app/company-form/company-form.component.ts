// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CompanyService } from '../services/company.service';

// @Component({
//   selector: 'app-company-form',
//   templateUrl: './company-form.component.html',
//   styleUrls: ['./company-form.component.css'],
// })
// export class CompanyFormComponent implements OnInit {
//   companyForm!: FormGroup;
//   isDragOver = false; // To handle drag-over state
//   logoUrl: string | ArrayBuffer | null = null; // To store the logo preview
//   errorMessage: string | null = null; // To store error messages

//   constructor(private fb: FormBuilder, private companyService: CompanyService) {}

//   ngOnInit(): void {
//     this.initializeForm();
//   }

//   private initializeForm(): void {
//     this.companyForm = this.fb.group({
//       logo: [null, Validators.required],
//       companyName: ['', Validators.required],
//       currency: ['', Validators.required],
//       country: ['', Validators.required],
//       state: ['', Validators.required],
//       city: ['', Validators.required],
//       address: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', Validators.required],
//       gstin: ['', Validators.required],
//       contactName: ['', Validators.required],
//       pinCode: ['', Validators.required],
//       website: ['', Validators.required],
//       taxationType: ['', Validators.required],
//       serviceTaxNo: ['', Validators.required],
//       bankDetails: this.fb.group({
//         bankName: ['', Validators.required],
//         branchName: ['', Validators.required],
//         adCode: ['', Validators.required],
//         upiId: ['', Validators.required],
//         accountNumber: ['', Validators.required],
//         ifscCode: ['', Validators.required],
//         swiftCode: ['', Validators.required],
//         accountHolderName: ['', Validators.required],
//       }),
//     });
//   }
//   onFileChange(event: any): void {
//     const file = event.target.files[0];
//     this.errorMessage = null; // Reset error message

//     // Check if a file is selected
//     if (file) {
//         if (file.type.startsWith('image/')) {
//             const reader = new FileReader();

//             // Read the file as Data URL
//             reader.readAsDataURL(file);

//             reader.onload = (e) => {
//                 const img = new Image();
//                 img.src = e.target?.result as string;

//                 img.onload = () => {
//                     // Check the dimensions
//                     if (img.width <= 2400 && img.height <= 2400) {
//                         this.companyForm.patchValue({ logo: file }); // Update form with the logo file
//                         this.logoUrl = img.src; // Set logo preview
//                     } else {
//                         this.errorMessage = 'Please upload an image with dimensions less than or equal to 240px x 240px.';
//                         this.logoUrl = null; // Reset logoUrl if dimensions are incorrect
//                     }
//                 };

//                 img.onerror = () => {
//                     this.errorMessage = 'Invalid image format. Please upload a valid image file.';
//                     this.logoUrl = null; // Reset logoUrl on error
//                 };
//             };
//         } else {
//             this.errorMessage = 'Please select a valid image file.';
//             this.logoUrl = null; // Reset logoUrl if the file is invalid
//         }
//     } else {
//         this.errorMessage = 'No file selected.';
//         this.logoUrl = null; // Reset logoUrl if no file is selected
//     }
// }

// removeLogo(): void {
//   this.logoUrl = null; // Clear the logo URL
//   this.companyForm.patchValue({ logo: null }); // Reset the logo field in the form
//   this.errorMessage = null; // Clear any error messages

//   // Reset the file input value
//   // const fileInput: HTMLInputElement = document.querySelector('input[type="file"]');
//   // if (fileInput) {
//   //   fileInput.value = ''; // Clear the file input value
//   // }
// }

//   onDragOver(event: DragEvent): void {
//     event.preventDefault();
//     this.isDragOver = true;
//   }

//   onDragLeave(event: DragEvent): void {
//     event.preventDefault();
//     this.isDragOver = false;
//   }

//   onDrop(event: DragEvent): void {
//     event.preventDefault();
//     this.isDragOver = false;

//     if (event.dataTransfer?.files && event.dataTransfer.files.length) {
//       const file = event.dataTransfer.files[0];
//       this.onFileChange({ target: { files: [file] } }); // Call existing onFileChange
//     }
//   }

//   onSubmit(): void {
//     if (this.companyForm.invalid) {
//       this.validateAllFields();
//       return; // Prevent submission if the form is invalid
//     }

//     const formData = new FormData();
//     Object.keys(this.companyForm.value).forEach((key) => {
//       if (key === 'bankDetails') {
//         Object.keys(this.companyForm.value[key]).forEach((bankKey) => {
//           formData.append(`bankDetails[${bankKey}]`, this.companyForm.value[key][bankKey]);
//         });
//       } else {
//         formData.append(key, this.companyForm.value[key]);
//       }
//     });

//     this.companyService.saveCompany(formData).subscribe(
//       (response) => {
//         console.log('Form submitted successfully:', response);
//       },
//       (error) => {
//         console.error('Error submitting form:', error);
//       }
//     );
//   }

//   private validateAllFields(): void {
//     Object.keys(this.companyForm.controls).forEach((field) => {
//       const control = this.companyForm.get(field);
//       control?.markAsTouched({ onlySelf: true });
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company.model';
import { ValidationService } from '../shared/validation.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  companyForm!: FormGroup;
  companyData!: Company;
  isDragOver = false; // To handle drag-over state
  logoUrl: string | ArrayBuffer | null = null; // To store the logo preview
  errorMessage: string | null = null; // To store error messages
  showExtraFields: boolean = false; // Track visibility of extra fields

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,

    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  toggleExtraFields(): void {
    this.showExtraFields = !this.showExtraFields; // Toggle visibility
  }
  private initializeForm(): void {
    this.companyForm = this.fb.group({
      logo: [null],
      companyName: ['', [Validators.required,this.validationService.validateCompanyName]],
      currency: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, this.validationService.validateEmail]],
      phone: ['', Validators.required],
      gstin: ['', Validators.required],
      contactName: ['', Validators.required],
      pinCode: ['', Validators.required],
      website: ['', Validators.required],
      taxationType: ['', Validators.required],
      serviceTaxNo: ['', Validators.required],
      bankName: [''],
      branchName: [''],
      adCode: [''],
      upiId: [''],
      accountNumber: [''],
      ifscCode: [''],
      swiftCode: [''],
      accountHolderName: [''],
      tinNo: [''],
      lst: [''],
      pan: [''],
      fassaiNo: [''],
      dlNo: [''],
      cst: [''],
      tan: [''],
    });
  }

  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   this.errorMessage = null; // Reset error message

  //   // Check if a file is selected
  //   if (file) {
  //     if (file.type.startsWith('image/')) {
  //       const reader = new FileReader();

  //       // Read the file as Data URL
  //       reader.readAsDataURL(file);

  //       reader.onload = (e) => {
  //         const img = new Image();
  //         img.src = e.target?.result as string;

  //         img.onload = () => {
  //           // Check the dimensions
  //           if (img.width <= 2400 && img.height <= 2400) {
  //             this.companyForm.patchValue({ logo: file }); // Update form with the logo file
  //             this.logoUrl = img.src; // Set logo preview
  //           } else {
  //             this.errorMessage =
  //               'Please upload an image with dimensions less than or equal to 240px x 240px.';
  //             this.logoUrl = null; // Reset logoUrl if dimensions are incorrect
  //           }
  //         };

  //         img.onerror = () => {
  //           this.errorMessage =
  //             'Invalid image format. Please upload a valid image file.';
  //           this.logoUrl = null; // Reset logoUrl on error
  //         };
  //       };
  //     } else {
  //       this.errorMessage = 'Please select a valid image file.';
  //       this.logoUrl = null; // Reset logoUrl if the file is invalid
  //     }
  //   } else {
  //     this.errorMessage = 'No file selected.';
  //     this.logoUrl = null; // Reset logoUrl if no file is selected
  //   }
  // }



  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   this.errorMessage = null;
  
  //   if (file) {
  //     if (file.type.startsWith('image/')) {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  
  //       reader.onload = (e) => {
  //         const img = new Image();
  //         img.src = e.target?.result as string;
  
  //         img.onload = () => {
  //           if (img.width <= 2400 && img.height <= 2400) {
  //             const base64Logo = (e.target?.result as string).split(',')[1]; // Get Base64 part
  //             this.companyForm.patchValue({ logo: base64Logo }); // Store Base64 string in form
  //             this.logoUrl = img.src;
  //           } else {
  //             this.errorMessage = 'Please upload an image with dimensions less than or equal to 240px x 240px.';
  //             this.logoUrl = null;
  //           }
  //         };
  //       };
  //     } else {
  //       this.errorMessage = 'Please select a valid image file.';
  //       this.logoUrl = null;
  //     }
  //   } else {
  //     this.errorMessage = 'No file selected.';
  //     this.logoUrl = null;
  //   }
  // }
  
  // removeLogo(): void {
  //   this.logoUrl = null; // Clear the logo URL
  //   this.companyForm.patchValue({ logo: null }); // Reset the logo field in the form
  //   this.errorMessage = null; // Clear any error messages
  // }

  // TypeScript
onFileChange(event: any): void {
  const file = event.target.files[0];
  this.errorMessage = null;

  if (file) {
      if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = (e) => {
              const img = new Image();
              img.src = e.target?.result as string;

              img.onload = () => {
                  if (img.width <= 2400 && img.height <= 2400) {
                      const base64Logo = (e.target?.result as string).split(',')[1]; // Get Base64 part
                      this.companyForm.patchValue({ logo: base64Logo }); // Store Base64 string in form
                      this.logoUrl = img.src;
                  } else {
                      this.errorMessage = 'Please upload an image with dimensions less than or equal to 240px x 240px.';
                      this.logoUrl = null;
                  }
              };
          };
      } else {
          this.errorMessage = 'Please select a valid image file.';
          this.logoUrl = null;
      }
  } else {
      this.errorMessage = 'No file selected.';
      this.logoUrl = null;
  }
}

removeLogo(fileInput: HTMLInputElement): void {
  this.logoUrl = null; // Clear the logo URL
  this.companyForm.patchValue({ logo: null }); // Reset the logo field in the form
  this.errorMessage = null; // Clear any error messages

  // Reset the file input to allow selecting the same file again
  if (fileInput) {
      fileInput.value = ''; // Clear the file input value
  }
}



  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length) {
      const file = event.dataTransfer.files[0];
      this.onFileChange({ target: { files: [file] } }); // Call existing onFileChange
    }
  }

  // onSubmit(): void {
  //   this.validateAllFields();
  //   if (this.companyForm.invalid) {
  //     return; // Prevent submission if the form is invalid
  //   }
  //   console.log("form data",this.companyForm)
  //   this.companyService.saveCompany(this.companyForm.value).subscribe(() => {
  //     // Show an alert after data is saved

  //     alert('Profile saved successfully!');

  //     // Reset the form
  //     this.companyForm.reset();
  //   });
  // }



  // onSubmit(): void {
  //   this.validateAllFields();
  //   if (this.companyForm.invalid) {
  //     return;
  //   }
  
  //   // Cast the form value to `Company` type
  //   this.companyData = this.companyForm.value as Company;
  
  //   this.companyService.saveCompany(this.companyData).subscribe(() => {
  //     alert('Profile saved successfully!');
  //     this.companyForm.reset();
  //   });
  // }
  onSubmit(): void {
    this.validateAllFields();
    if (this.companyForm.invalid) {
      return;
    }

    // Cast the form value to `Company` type
    this.companyData = this.companyForm.value as Company;

    this.companyService.saveCompany(this.companyData).subscribe(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Profile saved successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        heightAuto: false, // Disable default height adjustments for better alignment
        customClass: {
          popup: 'swal2-custom-popup', // Optional custom styling
          title: 'swal2-custom-title',
        }
      }).then(() => {
        this.companyForm.reset(); // Reset the form after alert confirmation
      });
    });
}



  private validateAllFields(): void {
    Object.keys(this.companyForm.controls).forEach((field) => {
      const control = this.companyForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
