import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = 'http://localhost:8080/items'; // Update with your API URL
  private itemCountURL = 'http://localhost:8080/items/allItemCounts'; // Spring Boot endpoint
  constructor(private http: HttpClient) {}

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item);
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/getAllItems`);  
  }
  

    
  getItemCount(): Observable<number> {
    return this.http.get<number>(this.itemCountURL);
}

}
