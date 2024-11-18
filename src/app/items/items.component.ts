import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { Item } from '../item/item.model';
import { ItemService } from './items.service';
import { Client } from '../client/models/client.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  invoiceListForm !:FormGroup
  isAddLineVisible: boolean = true; // Define the visibility property
  itemsForm: FormGroup;
  clients: Client[] = [];
  itemList: Item[] = []; // List to store items fetched from backend
subtotal: number = 0;
totalGST: number = 0;
grandTotal: number = 0;
isSpecificDateSelected: boolean = false;

  constructor(private fb: FormBuilder, private itemService: ItemService) {
    this.itemsForm = this.fb.group({
      items: this.fb.array([]),
    });

    this.invoiceListForm = this.fb.group({
      paymentTerms: ['on_receipt'],
      dueDate: [{ value: '', disabled: true }], // Disable the field initially
      clientName: [''],
      invoiceNo: [''],
      invoiceDate: [''],
      //due_date: [''],
      poNo: [''],
      poDate: [''],
     // paymentTerms: [''],
      termsAndConditions: [''],
      privateNotes: [''],
      items: this.fb.array([])  // To store items
    
    });
  }

  ngOnInit(): void {
    this.fetchItems();
    this.fetchClients();
    this.addLine(); // Add the first line to the table on init
   this.setDefaultDueDate();
   this.onPaymentTermsChange();


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

  fetchClients(): void {
    this.itemService.getClients().subscribe(
      (data: Client[]) => {
        this.clients = data; // Set the fetched client list
        console.log('CLients fetched successfully', this.clients);
      },
      (error) => {
        console.error('Error fetching clients:', error);
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

//   addLine(): void {
//     // Create a new item form group
//     const itemGroup = this.fb.group({
//         itemName: ['', Validators.required],
//         description: [''],
//         hsnSac: [''],
//         itemUnit: [''],
//         itemQuantity: [''],
//         itemPrice: [''],
//         itemDiscount: [''],
//         itemGst: [''],
//         total: [{ value: '', disabled: true }],
//         isReadOnly: [false],
//     });

//     // Add the new item to the form array
//     this.items.push(itemGroup);

//     // Optionally, mark the newly added line as editable (not read-only)
//     this.items.at(this.items.length - 1).get('isReadOnly')?.setValue(false);
// }

addLine(): void {
  // Create a new empty item form group
  const itemGroup = this.fb.group({
    itemName: ['', Validators.required], // Empty fields initially
    description: [''],
    hsnSac: [''],
    itemUnit: [''],
    itemQuantity: ['1', Validators.required],
    itemPrice: ['', Validators.required],
    itemDiscount: [''],
    itemGst: [''],
    total: [{ value: '', disabled: true }],
    isReadOnly: [false], // New line is editable initially
  });

  // Add the new item to the form array
  this.items.push(itemGroup);

  // Automatically focus on the newly added line for editing (optional)
  const index = this.items.length - 1;
  this.items.at(index).get('isReadOnly')?.setValue(false); // Set to editable mode
}



// saveLine(index: number): void {
//     // Get the current item form group at the specified index
//     const item = this.items.at(index);

//     // Ensure the form is valid before saving
//     if (item.valid) {
//         // Recalculate the total for the current line before saving
//         this.calculateTotal(index);

//         // Mark the current line as read-only after saving
//         item.get('isReadOnly')?.setValue(true);
        
//         // Optionally, you can disable editing if needed
//         item.get('isEditMode')?.setValue(false);

//         // Recalculate overall totals after saving
//         this.subtotal = this.getSubtotal();
//         this.totalGST = this.getTotalGST();
//         this.grandTotal = this.getGrandTotal();

//         // Add a new line after saving the current one (if applicable)
//         // You can uncomment the line below if needed to add a new line after save
//         // this.addLine();
//     } else {
//         // Optionally handle validation errors if the form is invalid
//         console.log("Form is invalid, cannot save");
//     }
// }


saveLine(index: number): void {
  // Get the current item form group at the specified index
  const item = this.items.at(index);

  // Ensure the form is valid before saving
  if (item.valid) {
      // Recalculate the total for the current line before saving
      this.calculateTotal(index);

      // Set the item as read-only after saving
      item.get('isReadOnly')?.setValue(true);
      this.subtotal = this.getSubtotal();
              this.totalGST = this.getTotalGST();
              this.grandTotal = this.getGrandTotal();
      console.log('Item saved:', item.value);
  } else {
      console.error('Form is invalid. Please fill out the required fields.');
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
setDefaultDueDate() {
  const today = new Date();
  const todayStr = this.formatDate(today);
  this.invoiceListForm.get('dueDate')?.setValue(todayStr); // Set default due date
}

onPaymentTermsChange(): void {
  const paymentTerm = this.invoiceListForm.get('paymentTerms')?.value;
  const today = new Date();

  let newDueDate = '';
  switch (paymentTerm) {
    case 'on_receipt':
      newDueDate = this.formatDate(today); // Due date is today
      this.isSpecificDateSelected = false;
      break;
    case 'net_7':
      newDueDate = this.formatDate(this.addDays(today, 7)); // 7 days later
      this.isSpecificDateSelected = false;
      break;
      case 'net_15':
        newDueDate = this.formatDate(this.addDays(today, 15)); // 15 days from today
        this.isSpecificDateSelected = false;
        break;

      case 'net_30':
        newDueDate = this.formatDate(this.addDays(today, 30)); // 30 days from today
        this.isSpecificDateSelected = false;
        break;

      case 'net_45':
        newDueDate = this.formatDate(this.addDays(today, 45)); // 45 days from today
        this.isSpecificDateSelected = false;
        break;

      case 'net_60':
        newDueDate = this.formatDate(this.addDays(today, 60)); // 60 days from today
        this.isSpecificDateSelected = false;
        break;

      case 'net_90':
        newDueDate = this.formatDate(this.addDays(today, 90)); // 90 days from today
        this.isSpecificDateSelected = false;
        break;
    case 'specific_date':
      this.isSpecificDateSelected = true;
      this.invoiceListForm.get('dueDate')?.enable(); // Enable due date picker
      return;  // Don't set due date for specific date case
    // Add cases for other payment terms...
  }

  // Set the new due date
  this.invoiceListForm.get('dueDate')?.setValue(newDueDate);
  if (!this.isSpecificDateSelected) {
    this.invoiceListForm.get('dueDate')?.disable(); // Disable when not specific date
  }
}

addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}




addItem() {
  const itemGroup = this.fb.group({
    itemName: [''],
    description: [''],
    hsnSac: [''],
    itemQuantity: [0],
    itemPrice: [0],
    itemDiscount: [0],
    itemGst: [0],
    total: [0]
  });
  this.items.push(itemGroup);
}

submitForm() {
  const formData = this.invoiceListForm.value;

  const invoiceData = {
    clientId: formData.clientName,
    invoiceNo: formData.invoiceNo,
    invoiceDate: formData.invoiceDate,
    dueDate: formData.dueDate,
    poNo: formData.poNo,
    poDate: formData.poDate,
    paymentTerms: formData.paymentTerms,
    termsAndConditions: formData.termsAndConditions,
    privateNotes: formData.privateNotes,
    items: formData.items
  };
  console.log('formData:>>>>>>>',formData);  // Check the structure of the data before sending

  this.itemService.createInvoice(invoiceData).subscribe(response => {
    console.log('Invoice created:', response);
  });
}

}
