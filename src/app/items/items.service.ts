import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../item/item.model';  
import { Client } from '../client/models/client.model';
import { InvoiceItem, InvoiceModel } from './invoice-Item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl = 'http://localhost:8080/items';
  private clientUrl = 'http://localhost:8080/clients'; 
  
private invoiceUrl = 'http://localhost:8080/invoices/createInvoice';


  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/getAllItems`);
  }




getClients(): Observable<Client[]> {
  return this.http.get<Client[]>(`${this.clientUrl}/getAllClients`);
}




createInvoice(invoiceData: any): Observable<InvoiceModel> {
  return this.http.post<InvoiceModel>(this.invoiceUrl, invoiceData);
}


}
