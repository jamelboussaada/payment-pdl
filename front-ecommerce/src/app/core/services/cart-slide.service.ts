import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Product } from '../pages/home-page/home-page.component';

interface CartSlideState {
  show: boolean;
  product: Product | null;
}

@Injectable({
  providedIn: 'root'
})
export class CartSlideService {
  private slideSubject = new Subject<CartSlideState>();
  public slideState$: Observable<CartSlideState> = this.slideSubject.asObservable();

  constructor() { }

  showSlide(product: Product): void {
    this.slideSubject.next({ show: true, product });
  }

  hideSlide(): void {
    this.slideSubject.next({ show: false, product: null });
  }
}
