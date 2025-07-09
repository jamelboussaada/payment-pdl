import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartPopupService } from '../../core/services/cart-popup.service';
import { Product } from '../../pages/home-page/home-page.component';

@Component({
  selector: 'app-cart-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css']
})
export class CartPopupComponent implements OnInit, OnDestroy {
  showPopup: boolean = false;
  product: Product | null = null;
  private popupSubscription: Subscription | undefined;

  constructor(private cartPopupService: CartPopupService, private router: Router) { }

  ngOnInit(): void {
    this.popupSubscription = this.cartPopupService.popupState$.subscribe(state => {
      this.showPopup = state.show;
      this.product = state.product;
    });
  }

  ngOnDestroy(): void {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }

  continueShopping(): void {
    this.cartPopupService.hidePopup();
  }

  makePurchase(): void {
    this.cartPopupService.hidePopup();
    this.router.navigate(['/cart']); // Navigate to the cart page
  }
}
