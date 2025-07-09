import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfOperationService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  downloadPdf(payload: any[]): void {
    const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token;
    console.log(token);
    if (!token) {
      this.snackBar.open('Authentication token not found. Please log in.', 'Close', {
        duration: 3000,
      });
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post('http://localhost:8080/api/pdf/download', payload, { headers, responseType: 'blob' })
      .subscribe({
        next: (response: Blob) => {
          const fileURL = URL.createObjectURL(response);
          window.open(fileURL, '_blank');
          URL.revokeObjectURL(fileURL);
          this.snackBar.open('Receipt downloaded successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        },
        error: (error) => {
          console.error('Error downloading receipt:', error);
          this.snackBar.open('Failed to download receipt. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
  }
}
