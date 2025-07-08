import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

interface FavoriteItem {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css'
})
export class FavouriteComponent {

  favorites: FavoriteItem[] = [];

  // Object to bind to form input fields
  newFavorite: FavoriteItem = {
    title: '',
    description: '',
    image: ''
  };

  // Add a new item to favorites
  addFavorite() {
    // Check if all fields are filled
    if (this.newFavorite.title && this.newFavorite.description && this.newFavorite.image) {
      this.favorites.push({ ...this.newFavorite });
      
      // Reset the form after adding
      this.newFavorite = { title: '', description: '', image: '' };
    } else {
      alert('Please fill all the fields!');
    }
  }

  // Remove item from favorites
  removeFavorite(item: FavoriteItem) {
    this.favorites = this.favorites.filter(fav => fav !== item);
  }

}
