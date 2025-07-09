import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { PaymentService } from '../../core/services/payment.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../core/services/cart.service'; // Updated import
import { Product } from '../../pages/home-page/home-page.component'; // New import

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, FormsModule, MatSnackBarModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Now an array of CartItem

  constructor(
    private paymentService: PaymentService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cartService: CartService // Injected CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems);
      sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    });
  }

  onQuantityChange(item: CartItem): void {
    if (item.quantity < 1) {
      item.quantity = 1;
    } else if (item.quantity > 10) {
      item.quantity = 10;
    }
    if (item.id !== undefined) {
      this.cartService.updateQuantity(item.id, item.quantity);
    }
  }

  removeItem(productId: number | undefined): void {
    if (productId !== undefined) {
      this.cartService.removeFromCart(productId);
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.prix * item.quantity), 0);
  }

  

  applyCoupon(): void {
    // Placeholder for coupon application logic
    console.log("Coupon applied!");
  }

  makePurchase(): void {
    const totalPrice = this.getTotalPrice();
    this.paymentService.makePayment(totalPrice).subscribe({
      next: (response) => {
        this.snackBar.open('Payment initiated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
          panelClass: ['snackbar-success']
        });
        console.log(response)

        if (response ) {
          setTimeout(() => {
            console.log(response)
            window.location.href = response.url;
          }, 4000); // 4-second delay
        } else {
          this.snackBar.open('Payment initiated, but no redirect URL received.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-warning']
          });
        }
      },
      error: (error) => {
        console.error('Payment error:', error);
        this.snackBar.open('Payment failed. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
