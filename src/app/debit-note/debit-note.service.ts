// credit-note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebitNoteService {
  private apiUrl = 'http://localhost:8080/api/debit-notes';

  constructor(private http: HttpClient) {}

  saveDebitNote(debitNote: any): Observable<any> {
    return this.http.post(this.apiUrl, debitNote);
  }
}
