import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:8080/api/v1/payment';
  private http = inject(HttpClient);

  constructor() { }

  makePayment(amount: number): Observable<any> {
    const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token;
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/pay`, { amount }, { headers });
  }
}
