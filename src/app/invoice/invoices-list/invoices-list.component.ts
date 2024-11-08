// // src/app/invoices-list/invoices-list.component.ts
// import { Component, OnInit } from '@angular/core';
// import { InvoiceService } from '../invoice.service';
// import { Invoice } from '../invoice/invoice.model';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-invoices-list',
//   templateUrl: './invoices-list.component.html',
//   styleUrls: ['./invoices-list.component.css'],
// })
// export class InvoicesListComponent implements OnInit {
//   invoices: Invoice[] = [];
 

//   constructor(private invoiceService: InvoiceService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.getAllInvoices();
//   }

//   getAllInvoices(): void {
//     this.invoiceService.getAllInvoices().subscribe(
//       (data: Invoice[]) => {
//         this.invoices = data;
//       },
//       (error) => {
//         console.error('Error fetching invoices:', error);
//       }
//     );
//   }



//   editInvoice(invoice_Id: number): void {
//     this.router.navigate(['/edit-invoice', invoice_Id]); // Navigate to the edit invoice page
//   }

//   deleteInvoice(invoice_Id: number): void {
//     if (confirm('Are you sure you want to delete this invoice?')) {
//       this.invoiceService.deleteInvoice(invoice_Id).subscribe(() => {
//         this.getAllInvoices(); // Refresh the list after deletion
//       });
//     }
//   }
// }



// new code
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoices-list.component.html', // Ensure this path is correct
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

  // deleteInvoice(id: string): void {
  //   this.invoiceService.deleteInvoice(id).subscribe(() => {
  //     this.fetchInvoices();
  //   });
  // }


//   deleteInvoice(id: string): void {
//     // Confirmation alert before deleting
//     const confirmation = window.confirm('Do you want to delete this invoice?');
//     if (confirmation) {
//         this.invoiceService.deleteInvoice(id).subscribe(() => {
//             this.fetchInvoices(); // Reload invoices after deletion
//         }, error => {
//             console.error('Error deleting invoice:', error);
//         });
//     }
// }

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
   
        padding: '1rem', // Set custom padding
  }).then((result) => {
    if (result.isConfirmed) {
      this.invoiceService.deleteInvoice(invoiceId).pipe(
        tap(() => {
          Swal.fire(
            'Deleted!',
            'Your invoice has been deleted.',
            'success'
          );
          this.fetchInvoices(); // Refresh the invoice list after deletion
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

  // editInvoice(id: string): void {
  //   this.router.navigate([`/edit-invoice/${id}`]);
  // }



editInvoice(id: string): void {
    // Confirmation alert before navigating to the edit page
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
