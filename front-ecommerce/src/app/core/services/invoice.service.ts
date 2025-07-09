import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl = 'http://localhost:8080/api/commands/myInvoices';

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<any> {
    const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }
}