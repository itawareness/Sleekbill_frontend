import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { Item } from '../item/item.model';
import { ItemService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  invoiceListForm !:FormGroup
  isAddLineVisible: boolean = true; // Define the visibility property
  itemsForm: FormGroup;
  itemList: Item[] = []; // List to store items fetched from backend
subtotal: number = 0;
totalGST: number = 0;
grandTotal: number = 0;

  constructor(private fb: FormBuilder, private itemService: ItemService) {
    this.itemsForm = this.fb.group({
      items: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.fetchItems();
    this.addLine(); // Add the first line to the table on init
  }

  // Fetch items from the backend
  fetchItems(): void {
    this.itemService.getItems().subscribe(
      (data: Item[]) => {
        this.itemList = data;
        console.log('Items fetched successfully', this.itemList);
      },
      (error) => {
        console.error('Error fetching items', error);
      }
    );
  }

  get items(): FormArray {
    return this.itemsForm.get('items') as FormArray;
  }

  getItemFormGroup(index: number): FormGroup {
    return this.items.at(index) as FormGroup;
  }

  isReadOnly(index: number): boolean {
    return this.getItemFormGroup(index).get('isReadOnly')?.value;
  }
// Flag to control visibility of the character count
showCharCount: boolean = true;

// Function to get remaining characters
getRemainingCharacters(index: number): number {
  const descriptionControl = this.getItemFormGroup(index).get('description');
  const maxLength = 1000;
  return maxLength - (descriptionControl?.value?.length || 0);
}

// Function to update character count on input
updateCharacterCount(index: number): void {
  const descriptionControl = this.getItemFormGroup(index).get('description');
  if (descriptionControl) {
    const maxLength = 1000;
    const currentLength = descriptionControl.value.length || 0;
    if (currentLength > maxLength) {
      descriptionControl.setValue(descriptionControl.value.slice(0, maxLength));
    }
  }
}

// Call this method after saving the line
onSaveLine(): void {
  this.showCharCount = false; // Hide the character count after saving
}

  addLine(): void {
    // Create a new item form group
    const itemGroup = this.fb.group({
        itemName: ['', Validators.required],
        description: [''],
        hsnSac: [''],
        itemUnit: [''],
        itemQuantity: [''],
        itemPrice: [''],
        itemDiscount: [''],
        itemGst: [''],
        total: [{ value: '', disabled: true }],
        isReadOnly: [false],
    });

    // Add the new item to the form array
    this.items.push(itemGroup);

    // Optionally, mark the newly added line as editable (not read-only)
    this.items.at(this.items.length - 1).get('isReadOnly')?.setValue(false);
}
saveLine(index: number): void {
    // Get the current item form group at the specified index
    const item = this.items.at(index);

    // Ensure the form is valid before saving
    if (item.valid) {
        // Recalculate the total for the current line before saving
        this.calculateTotal(index);

        // Mark the current line as read-only after saving
        item.get('isReadOnly')?.setValue(true);
        
        // Optionally, you can disable editing if needed
        item.get('isEditMode')?.setValue(false);

        // Recalculate overall totals after saving
        this.subtotal = this.getSubtotal();
        this.totalGST = this.getTotalGST();
        this.grandTotal = this.getGrandTotal();

        // Add a new line after saving the current one (if applicable)
        // You can uncomment the line below if needed to add a new line after save
        // this.addLine();
    } else {
        // Optionally handle validation errors if the form is invalid
        console.log("Form is invalid, cannot save");
    }
}



calculateTotal(index: number): void {
  const item = this.items.at(index);

  // Get values from the form controls
  const quantity = item.get('itemQuantity')?.value || 0;
  const price = item.get('itemPrice')?.value || 0;
  const discount = item.get('itemDiscount')?.value || 0;
  const gst = item.get('itemGst')?.value || 0;

  // Calculate the total
  let total = (quantity * price) - ((quantity * price) * (discount / 100));
  total += total * (gst / 100); // Add GST to the total

  // Round the total to two decimal places
  total = Math.round(total * 100) / 100;

  // Set the total in the form
  item.get('total')?.setValue(total);
}

 

 // Check if it's the first add line
 isAddLine(index: number): boolean {
  return this.getItemFormGroup(index).get('isAddLine')?.value;
}
 
editLine(index: number): void {
  const item = this.items.at(index);
  
  // Set to edit mode
  item.get('isReadOnly')?.setValue(false);  // Set to edit mode
  item.get('isEditMode')?.setValue(true);   // Flag as being in edit mode

  // Optionally, recalculate total when switching to edit mode (if needed)
  this.calculateTotal(index);

  // Recalculate overall totals (subtotal, totalGST, grandTotal)
  this.subtotal = this.getSubtotal();
  this.totalGST = this.getTotalGST();
  this.grandTotal = this.getGrandTotal();
}

  
  deleteLine(index: number): void {
    this.items.removeAt(index);  // Remove the row from the FormArray
  
  
    // Recalculate Subtotal, Total GST, and Grand Total after item change
    this.subtotal = this.getSubtotal();
    this.totalGST = this.getTotalGST();
    this.grandTotal = this.getGrandTotal();
  }
  
  confirmLine(index: number): void {
    const item = this.getItemFormGroup(index);
    item.get('isReadOnly')?.setValue(true);  // Set to read-only after confirmation
    this.calculateTotal(index);  
    

  }
  
  // Method to handle item selection change
  onItemChange(index: number): void {
    const formGroup = this.getItemFormGroup(index);
    const selectedItemName = formGroup.get('itemName')?.value;
  
    const selectedItem = this.itemList.find(item => item.name === selectedItemName);
  
    if (selectedItem) {
      formGroup.patchValue({
        description: selectedItem.description,
        hsnSac: selectedItem.hsn,
        itemUnit: selectedItem.unit,
        itemQuantity: selectedItem.quantity,
        itemPrice: selectedItem.tax,
        itemGst: selectedItem.tax,
      });
  
      // Recalculate the total after updating price
      this.calculateTotal(index);
  
      // Recalculate Subtotal, Total GST, and Grand Total after item change
      this.subtotal = this.getSubtotal();
      this.totalGST = this.getTotalGST();
      this.grandTotal = this.getGrandTotal();
    }
  }
// Calculate Subtotal (Excluding GST)
getSubtotal(): number {
  return this.items.controls.reduce((sum, item) => {
      const total = item.get('total')?.value || 0;
      const gst = item.get('itemGst')?.value || 0;

      // Subtract GST from the total to get the subtotal (Total - GST)
      const gstAmount = (total * gst) / 100;
      const subtotal = total - gstAmount;  // Subtotal = Total - GST

      return sum + subtotal;
  }, 0);
}

// Calculate Total GST
getTotalGST(): number {
  return this.items.controls.reduce((sum, item) => {
      const total = item.get('total')?.value || 0;
      const gst = item.get('itemGst')?.value || 0;

      // Calculate GST amount based on total
      const gstAmount = (total * gst) / 100;
      return sum + gstAmount;
  }, 0);
}

// Calculate Grand Total
getGrandTotal(): number {
  const subtotal = this.getSubtotal();
  const totalGST = this.getTotalGST();
  return subtotal + totalGST;
}



}
