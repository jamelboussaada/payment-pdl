import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) { }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  signin(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, credentials);
  }

  logout(): void {
    sessionStorage.clear(); // Clear all session storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
