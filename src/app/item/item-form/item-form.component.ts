import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../item.service';
import { ValidationService } from '../../shared/validation.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit{
  itemForm!: FormGroup;

  constructor(
    
    private itemService: ItemService,
    private validationService: ValidationService,
    private fb: FormBuilder, 
  ) {}
    
    ngOnInit(): void {
      this.initializeForm();
    }
    
  private initializeForm(): void {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, this.validationService.validateItemName]],
      currency: ['', [Validators.required, this.validationService.validateCurrency]],
      description: [''],
      salesUnitPrice: ['', [Validators.required, this.validationService.validateSalesUnitPrice]],
      salesCess: ['', [Validators.required, this.validationService.validateSalesCess]],
      purchaseUnitPrice: ['', [Validators.required, this.validationService.validatePurchasaeUnitPrice]],
      purchaseCess: ['', [Validators.required, this.validationService.validatePurchaseCess]],
      quantity: ['', [Validators.required, this.validationService.validateQuantity]],
      unit: ['', [Validators.required, this.validationService.validateUnit]],
      tax: ['', [Validators.required, this.validationService.validateTax]],
      hsn: ['', [Validators.required, this.validationService.validateHSN]],
      sku: ['', [Validators.required, this.validationService.validateSKU]],

    });

  }
 


  onInputChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    const upperCaseValue = input.value.toUpperCase(); 
    input.value = upperCaseValue;
  
    
    this.itemForm.get(field)?.setValue(upperCaseValue); 
  }
  
  onAddItem(): void {
    this.validateAllFields();
  
  if (this.itemForm.invalid) {
    return;
  }

  
      this.itemService.createItem(this.itemForm.value).subscribe(() => {
      
      alert('Item added successfully!');
      console.log('Form Submitted:', this.itemForm.value);

      
      this.itemForm.reset();
      });
    
    }

  private validateAllFields(): void {
    Object.keys(this.itemForm.controls).forEach((field) => {
      const control = this.itemForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
