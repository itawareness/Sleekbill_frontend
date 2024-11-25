import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { Item } from '../item/item.model';
import { ItemService } from './items.service';
import { Client } from '../client/models/client.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  invoiceListForm :FormGroup
  isAddLineVisible: boolean = true; 
  itemsForm: FormGroup;
  clients: Client[] = [];
  itemList: Item[] = []; 
subtotal: number = 0;
totalGST: number = 0;
grandTotal: number = 0;
isSpecificDateSelected: boolean = false;
savedItems: any[] = [];
constructor(private fb: FormBuilder, private itemService: ItemService) {
  this.itemsForm = this.fb.group({
    items: this.fb.array([]),
  });

  this.invoiceListForm = this.fb.group({
    paymentTerms: ['on_receipt'],
    dueDate: [{ value: '', disabled: true }],
    clientId: [null, Validators.required],
    invoiceNo: [''],
    invoiceDate: [''],
    poNo: [''],
    poDate: [''],
    termsAndConditions: [''],
    privateNotes: [''],
    items: this.fb.array([]), 
  });
}

get invoiceItems(): FormArray {
  return this.invoiceListForm.get('itemList') as FormArray;
}

 ngOnInit(): void {
    this.fetchItems();
    this.fetchClients();
    this.addLine(); 
   this.setDefaultDueDate();
   this.onPaymentTermsChange();


  }


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

showCharCount: boolean = true;


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


onSaveLine(): void {
  this.showCharCount = false; 
}

addLine(): void {

  const itemGroup = this.fb.group({
    itemName: ['', Validators.required],
    description: [''],
    hsnSac: [''],
    itemUnit: [''],
    itemQuantity: ['1', Validators.required],
    itemPrice: ['', Validators.required],
    itemDiscount: [''],
    itemGst: [''],
    total: [{ value: '', disabled: true }],
    isReadOnly: [false],
  });


  this.items.push(itemGroup);


  const index = this.items.length - 1;
  this.items.at(index).get('isReadOnly')?.setValue(false); 
}


saveLine(index: number): void {
 
  const item = this.items.at(index);

 
  if (item.valid) {
   
    this.calculateTotal(index);


    const itemData = item.getRawValue();

    
    item.get('isReadOnly')?.setValue(true);

  
    this.subtotal = this.getSubtotal();
    this.totalGST = this.getTotalGST();
    this.grandTotal = this.getGrandTotal();

    
    this.savedItems.push(itemData);

    console.log('Item saved:', itemData);
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
  item.get('isReadOnly')?.setValue(false);  
  item.get('isEditMode')?.setValue(true);   


  this.calculateTotal(index);

  // Recalculate overall totals (subtotal, totalGST, grandTotal)
  this.subtotal = this.getSubtotal();
  this.totalGST = this.getTotalGST();
  this.grandTotal = this.getGrandTotal();
}

  
  deleteLine(index: number): void {
    this.items.removeAt(index);  
  
  
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
        itemPrice: selectedItem.salesUnitPrice,
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



addItem(itemData: any): void {
  const items = this.items;
  items.push(this.fb.group({
    itemName: [itemData.itemName || '', Validators.required],
    description: [itemData.description || ''],
    hsnSac: [itemData.hsnSac || ''],
    itemQuantity: [itemData.itemQuantity || 1, [Validators.required, Validators.min(1)]],
    itemPrice: [itemData.itemPrice || 0, [Validators.required, Validators.min(0)]],
    itemDiscount: [itemData.itemDiscount || 0, [Validators.min(0)]],
    itemGst: [itemData.itemGst || 0, [Validators.min(0)]],
    total: [{ value: 0, disabled: true }],
    isReadOnly: [false],
  }));
}
submitForm(): void {
  // Clear previous saved items list
  this.invoiceListForm.get('dueDate')?.enable();
 
  this.savedItems = [];  

  // Collect invoice details
  const formData = this.invoiceListForm.value;

  // Collect items from the form (assuming `this.items` is your items form array)
  this.items.controls.forEach((_, index) => {
    this.saveLine(index);  // Assuming saveLine method saves the item data
  });

  // Structure the data for sending to the backend
  const invoiceData = {
    client: {
      id: formData.clientId, // Wrap clientId in a client object
    },
    invoiceNo: formData.invoiceNo,
    invoiceDate: formData.invoiceDate,
    dueDate: formData.dueDate,
    paymentTerms: formData.paymentTerms,
    poDate: formData.poDate,
    poNo: formData.poNo,
    privateNotes: formData.privateNotes,
    termsAndConditions: formData.termsAndConditions,
    itemList: this.savedItems
  };

  console.log('Data to be sent:', invoiceData);

  if (this.savedItems.length > 0) {
    // Display SweetAlert2 confirmation before sending data
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save this invoice?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Send the structured data to the backend via your service
        this.itemService.createInvoice(invoiceData).subscribe(response => {
          console.log('Items saved successfully:', response);

          // Show success alert
          Swal.fire({
            title: 'Success!',
            text: 'Invoice has been saved successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

        }, error => {
          console.error('Error saving items:', error);

          // Show error alert
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue saving the invoice.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      } else {
        console.log('Invoice saving was cancelled');
      }
    });
  } else {
    console.error('No items to save');

    // Show warning if no items are selected
    Swal.fire({
      title: 'Warning!',
      text: 'There are no items to save. Please add items to the invoice.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }

  this.invoiceListForm.get('dueDate')?.disable();
}


}
