// // src/app/features/client/client.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Client } from './models/client.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class ClientService {
//   private apiUrl = 'http://localhost:8080/clients'; 

//   constructor(private http: HttpClient) {}

//   // getClients(): Observable<Client[]> {
//   //   return this.http.get<Client[]>(this.apiUrl);
//   // }

//    // Modified to accept page and size parameters
//    getClients(page: number = 0, size: number = 10): Observable<any> {
//     const params = new HttpParams()
//       .set('page', page.toString())
//       .set('size', size.toString());

//     return this.http.get<any>(this.apiUrl, { params });
//   }

//   addClient(client: Client): Observable<Client> {
//     return this.http.post<Client>(this.apiUrl, client);
//   }

//   // Additional methods like updateClient, deleteClient can be added here
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './models/client.model';

interface PaginatedResponse {
  content: Client[];        // Paginated client data
  totalPages: number;       // Total number of pages
  totalElements: number;    // Total number of records
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/clients'; // Your backend API URL

  constructor(private http: HttpClient) {}

   // Method to get clients with pagination and search query
   getClients(page: number, size: number, searchQuery: string = ''): Observable<PaginatedResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', searchQuery); // Pass empty string if search is not provided

    return this.http.get<PaginatedResponse>(this.apiUrl, { params });
  }

  


  addClient(client: Client): Observable<Client> {
         return this.http.post<Client>(this.apiUrl, client);
      }
}
