import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import Swal from 'sweetalert2';
import { DebitNoteService } from './debit-note.service';

// Custom Validator for Discount
export function discountRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const discount = control.value;
    if (discount < 0 || discount > 100) {
      return { 'discountOutOfRange': true }; // Custom error
    }
    return null; // No error
  };
}

@Component({
  selector: 'app-debit-note-form',
  templateUrl: './debit-note.component.html',
  styleUrls: ['./debit-note.component.css']
})
export class DebitNoteFormComponent {
  debitNoteForm: FormGroup;

  constructor(private fb: FormBuilder, private debitNoteService: DebitNoteService) {
    this.debitNoteForm = this.fb.group({
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

    // Subscribe to value changes of each individual form control inside each item
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
    return this.debitNoteForm.get('items') as FormArray;
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
    if (this.debitNoteForm.valid) {
      this.calculateTotal(0); // Make sure total is calculated for the first item before submitting
  
      // Call the service method to save the debit note
      this.debitNoteService.saveDebitNote(this.debitNoteForm.value).subscribe(
        response => {
          console.log('Debit note saved successfully:', response);
  
          // Success alert with SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Debit note saved successfully!',
            confirmButtonText: 'OK'
          });
  
          // Reset the form after success
          this.debitNoteForm.reset();
        },
        error => {
          console.error('Error saving debit note:', error);
  
          // Error alert with SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'There was an issue saving the debit note. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }
  
  
}
