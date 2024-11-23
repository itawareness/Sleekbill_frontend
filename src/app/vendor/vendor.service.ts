import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from './models/vendor.model';


interface PaginatedResponse {
  content: Vendor[];        // Paginated client data
  totalPages: number;       // Total number of pages
  totalElements: number;    // Total number of records
}
@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private apiUrl = 'http://localhost:8080/vendors'; // Replace with your API endpoint
  private vendorCountURL = 'http://localhost:8080/vendors/allVendorCounts';
  constructor(private http: HttpClient) {}


 // Get vendors with pagination and search query
 getVendors(page: number, size: number, searchQuery: string = ''): Observable<PaginatedResponse> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
   

    if (searchQuery) {
      params = params.set('search', searchQuery);
    }
  return this.http.get<PaginatedResponse>(`${this.apiUrl}/getVendors`, { params });
}

addVendor(vendor: Vendor): Observable<Vendor> {
  return this.http.post<Vendor>(`${this.apiUrl}/addVendor`, vendor);  // Add vendor
}


  // Delete multiple selected clients (bulk delete)
  deleteSelectedVendors(vendorIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/deleteVendors`, vendorIds);
  }

  // Method to download paginated client data as an Excel file
  exportVendorToExcel(page: number, size: number): Observable<Blob> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get(`${this.apiUrl}/exportVendors`, {
      params: params,
      responseType: 'blob' // Since we are downloading a file
    });
  }







  updateVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiUrl}/${vendor.id}`, vendor);
  }

  deleteVendor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getVendorById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${id}`);
  }


    
  getVendorCount(): Observable<number> {
    return this.http.get<number>(this.vendorCountURL);
}

}
