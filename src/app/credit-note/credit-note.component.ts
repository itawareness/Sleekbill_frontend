import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CreditNoteService } from './credit-note.service';
import Swal from 'sweetalert2';

// Custom Validator for Discount
export function discountRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const discount = control.value;
    if (discount < 0 || discount > 100) {
      return { 'discountOutOfRange': true }; 
    }
    return null; 
  };
}

@Component({
  selector: 'app-credit-note-form',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.css']
})
export class CreditNoteFormComponent {
  creditNoteForm: FormGroup;

  constructor(private fb: FormBuilder, private creditNoteService: CreditNoteService) {
    this.creditNoteForm = this.fb.group({
      clientName: ['', Validators.required],
      number: ['', Validators.required],
      date: ['', Validators.required],
      invoiceNumber: ['', Validators.required],
      reason: ['', Validators.required],
      items: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Add the first item by default to ensure it's shown
    this.addItem();

    
    this.items.controls.forEach((item, index) => {
      item.valueChanges.subscribe(() => {
        this.calculateTotal(index);
      });
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      description: [''],
      hsnSac:[''],
      unit: [''],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', [discountRangeValidator()]], // Apply custom validator
      total: ['']
    });
  }

  get items(): FormArray {
    return this.creditNoteForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  calculateTotal(index: number): void {
    const itemGroup = this.items.at(index);

    // Get the values of quantity, price, and discount for the specific item
    const quantity = parseFloat(itemGroup.get('quantity')?.value) || 0;
    const price = parseFloat(itemGroup.get('price')?.value) || 0;
    const discount = parseFloat(itemGroup.get('discount')?.value) || 0;

    // Calculate the total price for the item
    const itemTotal = quantity * price;
    const itemDiscountAmount = (itemTotal * discount) / 100;
    const totalAfterDiscount = itemTotal - itemDiscountAmount;

    // Update the 'total' field for the specific item
    itemGroup.patchValue({
      total: totalAfterDiscount.toFixed(2), // Store the calculated total, rounded to 2 decimal places
    });
  }

  onSubmit(): void {
    if (this.creditNoteForm.valid) {
      this.calculateTotal(0); 
      this.creditNoteService.saveCreditNote(this.creditNoteForm.value).subscribe(
        response => {
          console.log('Credit note saved successfully:', response);
  
          // Success alert with SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Credit note saved successfully!',
            confirmButtonText: 'OK'
          });
  
          // Reset the form after success
          this.creditNoteForm.reset();
        },
        error => {
          console.error('Error saving credit note:', error);
  
          // Error alert with SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'There was an issue saving the credit note. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }
  
}
