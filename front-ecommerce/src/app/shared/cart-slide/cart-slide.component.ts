import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartSlideService } from '../../core/services/cart-slide.service';
import { Product } from '../../pages/home-page/home-page.component';

@Component({
  selector: 'app-cart-slide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-slide.component.html',
  styleUrls: ['./cart-slide.component.css']
})
export class CartSlideComponent implements OnInit, OnDestroy {
  showSlide: boolean = false;
  product: Product | null = null;
  private slideSubscription: Subscription | undefined;

  constructor(private cartSlideService: CartSlideService, private router: Router) { }

  ngOnInit(): void {
    this.slideSubscription = this.cartSlideService.slideState$.subscribe(state => {
      this.showSlide = state.show;
      this.product = state.product;
    });
  }

  ngOnDestroy(): void {
    if (this.slideSubscription) {
      this.slideSubscription.unsubscribe();
    }
  }

  continueShopping(): void {
    this.cartSlideService.hideSlide();
  }

  makePurchase(): void {
    this.cartSlideService.hideSlide();
    this.router.navigate(['/cart']); // Navigate to the cart page
  }
}
