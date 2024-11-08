import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/profiles';

  constructor(private http: HttpClient) {}

  // saveCompany(company: Company): Observable<Company> {
  //   return this.http.post<Company>(this.apiUrl, company);
  // }

  saveCompany(companyData: Company): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, companyData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
}
