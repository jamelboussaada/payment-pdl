import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent implements OnInit {
  stripeUrl: SafeResourceUrl | undefined;
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    const url = sessionStorage.getItem('stripePaymentUrl');
    if (url) {
      this.stripeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
