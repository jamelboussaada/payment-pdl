import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

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

  constructor(private router: Router) {}

  goHome() {
    // Navigate to home page or dashboard
    this.router.navigate(['/home']);
  }

  printReceipt() {
    const doc = new jsPDF();

    // Title Section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Payment Receipt', 14, 20);

    // Customer Information Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Customer Name: ${this.customerInfo.name}`, 14, 40);
    doc.text(`Email: ${this.customerInfo.email}`, 14, 50);
    doc.text(`Phone: ${this.customerInfo.phone}`, 14, 60);
    doc.text(`Address: ${this.customerInfo.address}`, 14, 70);

    // Payment Information Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Information', 14, 90);

    // Payment Details Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Payment ID: ${this.paymentDetails.id}`, 14, 100);
    doc.text(`Amount Paid: $${this.paymentDetails.amount.toFixed(2)}`, 14, 110);
    doc.text(`Date: ${this.paymentDetails.date}`, 14, 120);

    // Footer Section
    doc.setFontSize(10);
    doc.text('Thank you for your purchase!', 14, 140);
    doc.text('For any inquiries, please contact us at support@example.com', 14, 150);

    // Save the PDF and trigger the download
    doc.save('payment-receipt.pdf');
  }
}