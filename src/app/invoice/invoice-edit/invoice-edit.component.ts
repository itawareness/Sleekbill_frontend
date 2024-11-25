import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../invoice.model'; 
import { InvoiceService } from '../invoice.service'; 
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css'] 
})
export class InvoiceEditComponent implements OnInit {
  invoice: Invoice = {
    client_name: '',
    invoice_No: undefined,
    invoice_date: new Date(),
    invoice_due_date: new Date(), 
    purchase_No: undefined,
    purchase_date: new Date(), 
    payment_terms: '',
    tax_selection_on: '',
    export_type: '',
    export_currency: '',
    country_supply: '',
    place_supply: '',
    excise_duty: 0, 
    advance_payment: '',
    item_name: '',
    item_description: '',
    item_unit: '',
    item_quantity: 0, 
    item_price: 0, 
    item_discount: undefined,
    tax_cgst_sgst_igst: undefined,
    shipping_charges: 0, 
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
          this.calculateTotal(); 
          return of(data); 
        })
      ).subscribe({
        next: (data) => {
          this.invoice = data; 
        },
        error: (err) => {
          console.error('Error loading invoice:', err);
        }
      });
    }
  }
  
  calculateTotal(): void {
   
    const quantity = this.invoice.item_quantity ?? 0; 
    const price = this.invoice.item_price ?? 0;
    const discount = this.invoice.item_discount ?? 0; 
    const shippingCharges = this.invoice.shipping_charges ?? 0; 
    const exciseDuty = this.invoice.excise_duty ?? 0; 
    const taxRate = Number(this.invoice.tax_cgst_sgst_igst) || 0; 


    const totalDiscount = (price * discount) / 100; 
    const totalPrice = (price * quantity) - totalDiscount + shippingCharges + exciseDuty; 

   
    const totalTax = (totalPrice * taxRate) / 100;

    this.invoice.total = totalPrice + totalTax; 
}

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

}
