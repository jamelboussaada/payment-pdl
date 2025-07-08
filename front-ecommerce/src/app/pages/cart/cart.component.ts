import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, FormsModule],  // Add FormsModule here
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // The cart items and other methods remain unchanged

  cartItems = [
    {
      id: 1,
      name: 'Some name of item goes here nice',
      size: 'XL',
      color: 'blue',
      brand: 'Gucci',
      price: 1156.00,
      quantity: 1,
      imgUrl: 'assets/img1.jpg'
    },
    {
      id: 2,
      name: 'Product name goes here nice',
      size: 'XL',
      color: 'blue',
      brand: 'Gucci',
      price: 149.97,
      quantity: 1,
      imgUrl: 'assets/img2.jpg'
    },
    {
      id: 3,
      name: 'Another name of some product goes just here',
      size: 'XL',
      color: 'blue',
      brand: 'Tissot',
      price: 98.00,
      quantity: 1,
      imgUrl: 'assets/img3.jpg'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  onQuantityChange(item: any): void {
    if (item.quantity < 1) {
      item.quantity = 1;
    } else if (item.quantity > 10) {
      item.quantity = 10;
    }
    this.updateCart();
  }

  removeItem(item: any): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCart();
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateCart(): void {
    // Logic to update the cart (API call, saving to local storage, etc.)
  }

  applyCoupon(): void {
    // Placeholder for coupon application logic
    console.log("Coupon applied!");
  }
}
