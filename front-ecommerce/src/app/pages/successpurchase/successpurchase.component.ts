import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PdfOperationService } from '../../core/services/pdf-operation.service';

@Component({
  selector: 'app-successpurchase',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './successpurchase.component.html',
  styleUrl: './successpurchase.component.css'
})
export class SuccessPurchaseComponent {
  paymentDetails = {
    id: '1234567890',
    amount: 99.99,
    date: new Date().toLocaleDateString(),
  };

  customerInfo = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St, Cityville, ABC, 12345',
    phone: '(123) 456-7890',
  };

  constructor(
    private router: Router,
    private pdfOperationService: PdfOperationService
  ) {}

  goHome() {
    // Navigate to home page or dashboard
    this.router.navigate(['/home']);
  }

  printReceipt() {
    const payload = [
      {
        "nom": "clavier",
        "prix": 25.25,
        "quantité": 1
      },
      {
        "nom": "pc portable lenovo ",
        "prix": 25.25,
        "quantité": 1
      },
      {
        "nom": "souris msi",
        "prix": 25.25,
        "quantité": 1
      }
    ];
    this.pdfOperationService.downloadPdf(payload);
  }
}