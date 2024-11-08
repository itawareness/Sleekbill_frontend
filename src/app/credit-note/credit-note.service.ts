// credit-note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {
  private apiUrl = 'http://localhost:8080/api/credit-notes';

  constructor(private http: HttpClient) {}

  saveCreditNote(creditNote: any): Observable<any> {
    return this.http.post(this.apiUrl, creditNote);
  }
}
