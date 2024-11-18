// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Item } from '../item/item.model';


// @Injectable({
//   providedIn: 'root',
// })
// export class ItemService {
//   private baseUrl = 'http://localhost:8080/items';

//   constructor(private http: HttpClient) {}

//   getItems(): Observable<Item[]> {
//     return this.http.get<Item[]>(`${this.baseUrl}/getAllItems`);  
//   }
  

//   getItemDetailsById(id: number): Observable<Item> {
//     return this.http.get<Item>(`${this.baseUrl}/${id}`);
//   }

 
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../item/item.model';  // Correct path to the model
import { Client } from '../client/models/client.model';
import { InvoiceItem, InvoiceModel } from './invoice-Item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl = 'http://localhost:8080/items';
  private clientUrl = 'http://localhost:8080/clients'; // For Client-related API calls
  
private invoiceUrl = 'http://localhost:8080/invoices/createInvoice';


  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/getAllItems`);
  }



// Client-related API calls
getClients(): Observable<Client[]> {
  return this.http.get<Client[]>(`${this.clientUrl}/getAllClients`);
}




createInvoice(invoiceData: any): Observable<InvoiceModel> {
  return this.http.post<InvoiceModel>(this.invoiceUrl, invoiceData);
}


}
