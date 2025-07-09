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
    const cartString = sessionStorage.getItem('cart');
    let payload: any[] = [];
    if (cartString) {
      const cart = JSON.parse(cartString);
      payload = cart.map((item: any) => ({
        nom: item.name,
        prix: item.prix,
        quantite: item.quantity
      }));
    }
    this.pdfOperationService.downloadPdf(payload);
    sessionStorage.removeItem('cart');
  }
}