import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FavouriteService } from '../../core/services/favourite.service';
import { Product } from '../../pages/home-page/home-page.component';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent, RouterLink],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css'
})
export class FavouriteComponent implements OnInit {

  favorites: Product[] = [];

  constructor(private favouriteService: FavouriteService) { }

  ngOnInit(): void {
    this.favouriteService.favourites$.subscribe(favourites => {
      this.favorites = favourites;
    });
  }

  // Remove item from favorites
  removeFavorite(productId: number) {
    this.favouriteService.removeFromFavourites(productId);
  }

}
