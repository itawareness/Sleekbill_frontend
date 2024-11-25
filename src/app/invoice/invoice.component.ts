import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.model';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF   from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoice!: Invoice;
  invoice_Id: string = '';
 

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.invoice_Id = id !== null ? id : '';

    this.initializeForm();

    if (this.invoice_Id) {
      this.loadInvoice(this.invoice_Id);
    }

    this.fetchAllInvoices();

    this.invoiceForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  initializeForm(): void {
    this.invoiceForm = this.fb.group({
      client_name: ['', Validators.required],
      invoice_No: ['', Validators.required],
      invoice_date: ['', Validators.required],
      invoice_due_date: ['', Validators.required],
      purchase_No: ['', Validators.required],
      purchase_date: ['', Validators.required],
      payment_terms: ['', Validators.required],
      tax_selection_on: ['', Validators.required],
      export_type: ['', Validators.required],
      export_currency: ['', Validators.required],
      country_supply: ['', Validators.required],
      place_supply: ['', Validators.required],
      excise_duty: [, Validators.min(0)],
      advance_payment: [''],
      invoice_type: [''],
      item_name: ['', Validators.required],
      item_description: [''],
      hsn_sac: [''],
      item_unit: [''],
      item_quantity: [, [Validators.required, Validators.min(1)]],
      item_price: [, [Validators.required, Validators.min(0)]],
      item_discount: [, Validators.min(0)],
      tax_cgst_sgst_igst: [],
      shipping_charges: [, Validators.min(0)],
      total: [{ value: '', disabled: true }],


   
    });
  }

  loadInvoice(id: string): void {
    this.invoiceService.getInvoiceById(id).subscribe(
      (invoice: Invoice) => {
        if (invoice) {
          this.invoice = invoice;
          this.invoiceForm.patchValue(invoice);
        } else {
          console.error('Invoice not found');
        }
      },
      (error) => {
        console.error('Error fetching invoice:', error);
      }
    );
  }

  fetchAllInvoices(): void {
    this.invoiceService.getAllInvoices()
      .pipe(
        tap((data) => {
          console.log('Fetched invoices:', data);
        }),
        catchError((error) => {
          console.error('Error fetching invoices:', error);
          throw error;
        })
      )
      .subscribe();
  }

  calculateTotal(): void {
    const itemPrice = parseFloat(this.invoiceForm.get('item_price')?.value) || 0;
    const itemQuantity = parseFloat(this.invoiceForm.get('item_quantity')?.value) || 0;
    const itemDiscountPercent = parseFloat(this.invoiceForm.get('item_discount')?.value) || 0;
    const exciseDutyPercent = parseFloat(this.invoiceForm.get('excise_duty')?.value) || 0;
    const shippingCharges = parseFloat(this.invoiceForm.get('shipping_charges')?.value) || 0;
    const gstRate = parseFloat(this.invoiceForm.get('tax_cgst_sgst_igst')?.value) || 0;

    const itemTotal = itemPrice * itemQuantity;
    const itemDiscountAmount = (itemTotal * itemDiscountPercent) / 100;
    const subtotalAfterDiscount = itemTotal - itemDiscountAmount;

    let exciseDutyAmount = 0;
    if (exciseDutyPercent > 0) {
        exciseDutyAmount = (subtotalAfterDiscount * exciseDutyPercent) / 100;
    }

    const taxableAmount = subtotalAfterDiscount + exciseDutyAmount;
    const gstAmount = (taxableAmount * gstRate) / 100;
    const totalAmount = taxableAmount + gstAmount + shippingCharges;

    // Round off the total amount
    const roundedTotalAmount = Math.round(totalAmount);

    console.log('Total Amount:', roundedTotalAmount);

    this.invoiceForm.patchValue({
        total: roundedTotalAmount,
    });
}


  onSubmit(): void {
    if (this.invoiceForm.valid) {
        this.calculateTotal();
        this.invoiceForm.get('total')?.enable();

        const invoiceData: Invoice = this.invoiceForm.value;

        // Save the invoice
        this.invoiceService.addInvoice(invoiceData)
            .pipe(
                tap((response) => {
                    console.log('Invoice saved successfully:', response);
                    // Show SweetAlert success message
                    Swal.fire({
                        title: 'Success!',
                        text: 'Invoice saved successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    this.generatePDF(invoiceData);
                    this.invoiceForm.reset();
                    this.fetchAllInvoices();
                }),
                catchError((error) => {
                    console.error('Error saving invoice:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an error saving the invoice.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    throw error;
                })
            )
            .subscribe(() => {
                this.router.navigate(['/add-invoice']);
            });
    }
}

  generatePDF(invoiceData: Invoice): void {
    const doc = new jsPDF();

const pageWidth = doc.internal.pageSize.getWidth();


doc.setFontSize(20);


const titleText = `${invoiceData.invoice_type}`;
const titleWidth = doc.getTextWidth(titleText);
const titleX = pageWidth - titleWidth - 20;


doc.text(titleText, titleX, 20);


doc.setFontSize(12);
const invoiceDate = `Invoice Date: ${invoiceData.invoice_date}`;
const invoicedatewidth = doc.getTextWidth(invoiceDate);
const invoiceX = pageWidth - invoicedatewidth - 20; 


doc.text(invoiceDate, invoiceX, 30);



doc.setFontSize(12);
const invoiceDueDate = `Invoice Due Date: ${invoiceData.invoice_due_date}`;
const invoiceduedatewidth = doc.getTextWidth(invoiceDueDate);
const invoicedueX = pageWidth - invoiceduedatewidth - 20; 


doc.text(invoiceDueDate, invoicedueX, 40);



doc.setFontSize(12);
const supplyPlace = `Place Of Supply: ${invoiceData.place_supply}`;
const supplyPlaceWidth = doc.getTextWidth(supplyPlace);
const supplyX = pageWidth - supplyPlaceWidth - 20;

doc.text(supplyPlace, supplyX, 50);

 
    const tableData: (string | number)[][] = [
      ['Sr No', 'Item Name', 'Description', 'HSN/SAC', 'Unit', 'Quantity', 'Price', 'Discount(%)', 'GST Tax(%)', 'Shipping Charges'],
      [
        1, 
        invoiceData.item_name || '', 
        invoiceData.item_description || '', 
        invoiceData.hsn_sac || '', 
        invoiceData.item_unit || '', 
        invoiceData.item_quantity || 0, 
        invoiceData.item_price || 0, 
        invoiceData.item_discount || 0, 
        invoiceData.tax_cgst_sgst_igst || 0, 
        invoiceData.shipping_charges || 0 
      ]
    ];


    autoTable(doc, {
      head: [tableData[0]], 
      body: [tableData[1]], 
      startY: 60, 
      theme: 'grid', 
      styles: {
        cellPadding: 2,
        fontSize: 10,
        lineColor: [0, 0, 0], 
        lineWidth: 0.1, 
      },
      headStyles: {
        fillColor: [42, 98, 130],
        textColor: [255, 255, 255], 
      },
      didParseCell: (data) => {
      
        data.cell.styles.lineColor = [0, 0, 0];
        data.cell.styles.lineWidth = 0.1;
      },
      didDrawCell: (data) => {
     
        if (data.section === 'body' && data.row.index === data.table.body.length - 1) {
          const totalText = `Total Amount: ${invoiceData.total}`;
  
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0); 
         
          const textWidth = doc.getTextWidth(totalText);
          const pageWidth = doc.internal.pageSize.getWidth();
          const totalX = pageWidth - textWidth - 20; 
  
         
          doc.text(totalText, totalX, data.cell.y + data.cell.height + 10); 
        }
      }
    });

    doc.save(`Invoice_${invoiceData.invoice_No}.pdf`);
}

}






