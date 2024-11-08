// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Invoice } from './invoice';
// import { Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class InvoiceService {

//   constructor(private httpClient:HttpClient) {}

//   private baseUrl="http://localhost:8181/invoices/all"

//   getInvoices():Observable<Invoice[]>{

//   return this.httpClient.get<Invoice[]>(`${this.baseUrl}`)


//   }
// }


// new code 


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Invoice } from './invoice/invoice.model'; // Adjust the path as necessary
// //import { environment } from '../../environments/environment'; // Import environment

// @Injectable({
//   providedIn: 'root'
// })
// export class InvoiceService {
//   private baseUrl = "http://localhost:8080/invoices"; // Base URL for invoices

//   constructor(private http: HttpClient) {}

//   createInvoice(invoice: Invoice): Observable<Invoice> {
//     return this.http.post<Invoice>(this.baseUrl, invoice);
//   }


//   getAllInvoices(): Observable<Invoice[]> {
//     return this.http.get<Invoice[]>(this.baseUrl);
//   }


//   // get invoice by id
//   // getInvoiceById(invoice_Id: number): Observable<Invoice> {
//   //   return this.http.get<Invoice>(`${this.baseUrl}/invoices/${invoice_Id}`);
//   // }

//   getInvoiceById(invoice_Id: number): Observable<Invoice> {
//     return this.http.get<Invoice>(`${this.baseUrl}/${invoice_Id}`); // Ensure this endpoint exists
//   }
  
//   // update invoice by id
//   updateInvoice(invoice_Id: number, invoice: Invoice): Observable<Invoice> {
//     return this.http.put<Invoice>(`${this.baseUrl}/${invoice_Id}`, invoice);
//   }

//   // delete invoice by id
//   deleteInvoice(invoice_Id: number): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${invoice_Id}`);
//   }
//   // Other methods (getInvoices, updateInvoice, etc.) can be added here
// }

// end code 

// invoice.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from './invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = 'http://localhost:8080/invoices'; // Your API base URL

  constructor(private http: HttpClient) { }

  // Fetch all invoices
  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrl);
  }

  // Fetch invoice by ID
  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.baseUrl}/${id}`);
  }

  // Add new invoice
  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.baseUrl, invoice);
  }

  // Update invoice by ID
  updateInvoice(id: string, invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.baseUrl}/${id}`, invoice);
  }

  // Delete invoice by ID
  deleteInvoice(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
