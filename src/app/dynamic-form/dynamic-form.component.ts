// dynamic-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  myForm: FormGroup;
  editMode: boolean[] = []; // Tracks whether the row is in edit mode

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      rows: this.fb.array([])
    });
  }

  get rows(): FormArray {
    return this.myForm.get('rows') as FormArray;
  }

  // Add new row with editable fields
  addRow() {
    const rowFormGroup = this.fb.group({
      itemName: '', // Initially enabled
      quantity: '',
      price: ''
    });
    this.rows.push(rowFormGroup);
    this.editMode.push(true); // Set to true to indicate it's in edit mode initially
  }

  // Toggle between edit and save mode
  saveRow(index: number) {
    const row = this.rows.at(index) as FormGroup;

    // Check if the fields are in edit mode
    if (this.editMode[index]) {
      // Make the fields non-editable
      row.controls['itemName'].disable();
      row.controls['quantity'].disable();
      row.controls['price'].disable();
      this.editMode[index] = false; // Set to false to indicate it's no longer in edit mode
    }
  }

  // Enable editing mode when the user clicks "Edit"
  editRow(index: number) {
    const row = this.rows.at(index) as FormGroup;

    // Enable fields for editing
    row.controls['itemName'].enable();
    row.controls['quantity'].enable();
    row.controls['price'].enable();
    this.editMode[index] = true; // Set to true to indicate it's in edit mode
  }

  // Remove the row from the FormArray
  removeRow(index: number) {
    this.rows.removeAt(index);
    this.editMode.splice(index, 1);
  }

  submitForm() {
    console.log(this.myForm.value);
  }
}
