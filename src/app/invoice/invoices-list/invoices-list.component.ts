import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoices-list.component.html', 
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchInvoices();
  }

  fetchInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe(data => {
      this.invoices = data;
    });
  }

deleteInvoice(invoiceId: string): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won’t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    width: '350px', 
   
        padding: '1rem', 
  }).then((result) => {
    if (result.isConfirmed) {
      this.invoiceService.deleteInvoice(invoiceId).pipe(
        tap(() => {
          Swal.fire(
            'Deleted!',
            'Your invoice has been deleted.',
            'success'
          );
          this.fetchInvoices(); 
        }),
        catchError((error) => {
          console.error('Error deleting invoice:', error);
          Swal.fire(
            'Error!',
            'There was an issue deleting the invoice.',
            'error'
          );
          throw error;
        })
      ).subscribe();
    }
  });
}

editInvoice(id: string): void {

    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to edit this invoice.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            this.router.navigate([`/edit-invoice/${id}`]);
        }
    });
}

}
