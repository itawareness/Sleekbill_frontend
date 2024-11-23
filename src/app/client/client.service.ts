
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Client } from './models/client.model';

// interface PaginatedResponse {
//   content: Client[];        // Paginated client data
//   totalPages: number;       // Total number of pages
//   totalElements: number;    // Total number of records
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class ClientService {
//   private apiUrl = 'http://localhost:8080/clients'; // Your backend API URL

//   constructor(private http: HttpClient) {}


//  getClients(page: number, size: number, searchQuery: string = ''): Observable<PaginatedResponse> {
//   let params = new HttpParams()
//     .set('page', page.toString())
//     .set('size', size.toString());

//   if (searchQuery) {
//     params = params.set('search', searchQuery);
//   }
//   return this.http.get<PaginatedResponse>(`${this.apiUrl}/getClients`, { params });

// }
// // Method to add a new client (POST request)
// addClient(client: Client): Observable<Client> {
//   // Call the POST endpoint to add a new client
//   return this.http.post<Client>(`${this.apiUrl}/addClients`, client);
// }


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
  private apiUrl = 'http://localhost:8080/clients'; // Your backend API URL
  private clientCountURL = 'http://localhost:8080/clients/allClientCounts'; // Spring Boot endpoint
  constructor(private http: HttpClient) {}

  // Get paginated clients
  getClients(page: number, size: number, searchQuery: string = ''): Observable<PaginatedResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (searchQuery) {
      params = params.set('search', searchQuery);
    }
    return this.http.get<PaginatedResponse>(`${this.apiUrl}/getClients`, { params });
  }

  // Add a new client
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/addClients`, client);
  }

  // // Delete a single client
  // deleteClient(clientId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/deleteClient/${clientId}`);
  // }

  // Delete multiple selected clients (bulk delete)
  deleteSelectedClients(clientIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/deleteClients`, clientIds);
  }

  // Method to download paginated client data as an Excel file
  exportClientsToExcel(page: number, size: number): Observable<Blob> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get(`${this.apiUrl}/exportClients`, {
      params: params,
      responseType: 'blob' // Since we are downloading a file
    });

    
  }

  
  getClientCount(): Observable<number> {
    return this.http.get<number>(this.clientCountURL);
}



}