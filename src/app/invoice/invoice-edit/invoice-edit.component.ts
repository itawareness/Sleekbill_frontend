import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../invoice.model'; // Adjust the path according to your project structure
import { InvoiceService } from '../invoice.service'; // Adjust the path according to your project structure
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css'] // Optional: add styles if necessary
})
export class InvoiceEditComponent implements OnInit {
  invoice: Invoice = {
    client_name: '',
    invoice_No: undefined,
    invoice_date: new Date(), // Changed from '' to new Date()
    invoice_due_date: new Date(), // Changed from '' to new Date()
    purchase_No: undefined,
    purchase_date: new Date(), // Changed from '' to new Date()
    payment_terms: '',
    tax_selection_on: '',
    export_type: '',
    export_currency: '',
    country_supply: '',
    place_supply: '',
    excise_duty: 0, // Set to 0 or null
    advance_payment: '',
    item_name: '',
    item_description: '',
    item_unit: '',
    item_quantity: 0, // Changed from undefined to 0
    item_price: 0, // Changed from undefined to 0
    item_discount: undefined,
    tax_cgst_sgst_igst: undefined,
    shipping_charges: 0, // Set to 0 or null
    total: undefined,
   
  };

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInvoice();
  }

  loadInvoice(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceService.getInvoiceById(id).pipe(
        switchMap((data: Invoice) => {
          this.invoice = data;
          this.calculateTotal(); // Calculate total after loading invoice data
          return of(data); // Ensure an observable is returned
        })
      ).subscribe({
        next: (data) => {
          this.invoice = data; // Assign the loaded invoice data
        },
        error: (err) => {
          console.error('Error loading invoice:', err);
        }
      });
    }
  }
  
  calculateTotal(): void {
    // Use nullish coalescing to default to 0 for optional numeric properties
    const quantity = this.invoice.item_quantity ?? 0; // Default to 0 if undefined
    const price = this.invoice.item_price ?? 0; // Default to 0 if undefined
    const discount = this.invoice.item_discount ?? 0; // Default to 0 if undefined
    const shippingCharges = this.invoice.shipping_charges ?? 0; // Default to 0 if undefined
    const exciseDuty = this.invoice.excise_duty ?? 0; // Default to 0 if undefined
    const taxRate = Number(this.invoice.tax_cgst_sgst_igst) || 0; // Convert tax to number

    // Calculate total based on the provided formula
    const totalDiscount = (price * discount) / 100; // Total discount as a number
    const totalPrice = (price * quantity) - totalDiscount + shippingCharges + exciseDuty; // Total price as a number

    // Calculate total tax, ensuring tax is treated as a number
    const totalTax = (totalPrice * taxRate) / 100; // Total tax calculation

    this.invoice.total = totalPrice + totalTax; // Final total
}



//   onUpdate(): void {
//     const id = this.invoice.invoice_No; // Get the invoice number
//     if (id !== undefined) {
//         this.invoiceService.updateInvoice(id.toString(), this.invoice).subscribe({
//             next: () => {
//                 this.router.navigate(['/invoices']); // Redirect after update
//             },
//             error: (err) => {
//                 console.error('Error updating invoice:', err);
//             }
//         });
//     } else {
//         console.error('Invoice number is undefined, cannot update.');
//         // Optionally, display an error message to the user here
//     }
// }




onUpdate(): void {
  const id = this.route.snapshot.paramMap.get('id');
  console.log('Updating invoice with ID:', id);
  console.log('Invoice data:', this.invoice); // Log the invoice data
  
  if (id) {
      this.invoiceService.updateInvoice(id, this.invoice).subscribe(() => {
        window.alert('Data Updated successfully!'); // Show success alert message
          this.router.navigate(['/invoices-list']);
      }, error => {
          console.error('Error updating invoice:', error);
      });
  }
}


// onUpdate(): void {
//   const id = this.route.snapshot.paramMap.get('id');
//   console.log('Updating invoice with ID:', id);
//   console.log('Invoice data:', this.invoice); // Log the invoice data

//   // Ask for confirmation before updating
//   const confirmed = window.confirm('Do you want to update this invoice?');

//   if (confirmed) { // Proceed only if the user confirms
//       if (id) {
//           this.invoiceService.updateInvoice(id, this.invoice).subscribe(() => {
//            // window.alert('Data Updated successfully!'); // Show success alert message
//             this.router.navigate(['/invoices-list']);
//           }, error => {
//               console.error('Error updating invoice:', error);
//               window.alert('Error updating invoice. Please try again.'); // Show error alert message
//           });
//       }
//   } else {
//       window.alert('Update canceled.'); // Optional: Inform the user that the update was canceled
//   }
// }


}
