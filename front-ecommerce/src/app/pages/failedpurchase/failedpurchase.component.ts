import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failedpurchase',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './failedpurchase.component.html',
  styleUrl: './failedpurchase.component.css'
})
export class FailedPurchaseComponent {

  retryPurchase() {
    // Logic to retry the purchase
    console.log('Attempting to retry the purchase...');
  }
  constructor(private router: Router) {}
  goHome() {
    // Navigate to home page or dashboard
    this.router.navigate(['/home']);
  }

}