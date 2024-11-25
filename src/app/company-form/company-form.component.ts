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
  isDragOver = false; 
  logoUrl: string | ArrayBuffer | null = null; 
  errorMessage: string | null = null; 
  showExtraFields: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,

    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  toggleExtraFields(): void {
    this.showExtraFields = !this.showExtraFields; 
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
  this.logoUrl = null; 
  this.companyForm.patchValue({ logo: null }); 
  this.errorMessage = null; 

  
  if (fileInput) {
      fileInput.value = ''; 
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
      this.onFileChange({ target: { files: [file] } }); 
    }
  }



 
  onSubmit(): void {
    this.validateAllFields();
    if (this.companyForm.invalid) {
      return;
    }


    this.companyData = this.companyForm.value as Company;

    this.companyService.saveCompany(this.companyData).subscribe(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Profile saved successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        heightAuto: false,
        customClass: {
          popup: 'swal2-custom-popup', 
          title: 'swal2-custom-title',
        }
      }).then(() => {
        this.companyForm.reset(); 
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
