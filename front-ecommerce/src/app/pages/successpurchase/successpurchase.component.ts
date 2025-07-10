import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
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
export class SuccessPurchaseComponent implements OnInit {
  paymentDetails = {
    clientName: '',
    amount: 0,
    date: new Date().toLocaleDateString(),
  };

  customerInfo = {
    name: '',
    email: '',
    address: '123 Main St, Cityville, ABC, 12345',
    phone: '(123) 456-7890',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pdfOperationService: PdfOperationService
  ) {}

  ngOnInit(): void {
    const clientName = this.extractClientNameFromToken();
    this.paymentDetails.clientName = clientName;
    this.customerInfo.name = clientName;

    const emailFromToken = this.extractClientEmailFromToken();
    if (emailFromToken) {
      this.customerInfo.email = emailFromToken;
    }

    // Get amount from query params
    this.route.queryParams.subscribe(params => {
      const amountParam = params['amount'];
      if (amountParam) {
        this.paymentDetails.amount = parseFloat(amountParam);
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  printReceipt(): void {
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

  private extractClientNameFromToken(): string {
    const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token ;
    if (!token) return 'Client';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.name + ' '  + payload.lastName || 'Client';
    } catch {
      return 'Client';
    }
  }

  private extractClientEmailFromToken(): string | null {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email || null;
    } catch {
      return null;
    }
  }
}
