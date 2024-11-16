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

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl = 'http://localhost:8080/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/getAllItems`);
  }

  getItemDetailsById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/${id}`);
  }
}
