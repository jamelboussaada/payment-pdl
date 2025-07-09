import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private favouritesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public favourites$: Observable<any[]> = this.favouritesSubject.asObservable();

  constructor() { }

  addToFavourites(product: any): void {
    const currentFavourites = this.favouritesSubject.getValue();
    const exists = currentFavourites.some(fav => fav.id === product.id);
    if (!exists) {
      this.favouritesSubject.next([...currentFavourites, product]);
      console.log('Product added to favourites:', product);
    } else {
      console.log('Product already in favourites:', product);
    }
  }

  getFavourites(): any[] {
    return this.favouritesSubject.getValue();
  }

  removeFromFavourites(productId: number): void {
    const currentFavourites = this.favouritesSubject.getValue();
    const updatedFavourites = currentFavourites.filter(fav => fav.id !== productId);
    this.favouritesSubject.next(updatedFavourites);
    console.log('Product removed from favourites, ID:', productId);
  }
}
