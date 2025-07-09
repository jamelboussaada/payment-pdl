import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../pages/home-page/home-page.component';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  constructor() { }

  addToCart(product: Product): void {
    const currentCart = this.cartSubject.getValue();
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      // If item exists, increment quantity
      existingItem.quantity++;
      this.cartSubject.next([...currentCart]); // Emit updated array
      console.log('Product quantity updated in cart:', existingItem);
    } else {
      // If item does not exist, add it with quantity 1
      this.cartSubject.next([...currentCart, { ...product, quantity: 1 }]);
      console.log('Product added to cart:', product);
    }
  }

  getCartItems(): Product[] {
    return this.cartSubject.getValue();
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = currentCart.filter(item => item.id !== productId);
    this.cartSubject.next(updatedCart);
    console.log('Product removed from cart, ID:', productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this.cartSubject.getValue();
    const itemToUpdate = currentCart.find(item => item.id === productId);

    if (itemToUpdate) {
      itemToUpdate.quantity = quantity;
      this.cartSubject.next([...currentCart]);
      console.log('Product quantity updated:', itemToUpdate);
    }
  }
}
