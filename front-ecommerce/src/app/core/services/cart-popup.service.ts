import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Product } from '../../pages/home-page/home-page.component';

interface CartPopupState {
  show: boolean;
  product: Product | null;
}

@Injectable({
  providedIn: 'root'
})
export class CartPopupService {
  private popupSubject = new Subject<CartPopupState>();
  public popupState$: Observable<CartPopupState> = this.popupSubject.asObservable();

  constructor() { }

  showPopup(product: Product): void {
    this.popupSubject.next({ show: true, product });
  }

  hidePopup(): void {
    this.popupSubject.next({ show: false, product: null });
  }
}
