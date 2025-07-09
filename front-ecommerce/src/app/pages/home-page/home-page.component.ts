import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FavouriteService } from '../../core/services/favourite.service';
import { NotificationService } from '../../core/services/notification.service';
import { CartService } from '../../core/services/cart.service';
import { CartPopupService } from '../../core/services/cart-popup.service'; // New import

// Temporary Product interface definition (replace with real one if available)
export interface Product {
  id: number; // Made id mandatory
  name?: string;
  prix: number; // Made price mandatory
  imageUrl?: string;  // Add this property
  description?: string;       // Add this property if required
  quantite?: number;
}


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  // ========== Component Properties ==========
  public products: Product[] = [];

  public favouriteProducts: Product[] = []; // New property

  public partnersArray = [
    { imgName: '../assets/partner/p1.png' },
    { imgName: '../assets/partner/p4.png' },
    { imgName: '../assets/partner/p2.png' },
    { imgName: '../assets/partner/p5.png' },
    { imgName: '../assets/partner/p3.png' },
    { imgName: '../assets/partner/p6.png' }
  ];

  // Image URLs
  public url1 = 'assets/img1.jpg';
  public url2 = 'assets/img2.jpg';
  public url3 = 'assets/img3.jpg';
  public url4 = 'assets/img4.jpg';
  public url5 = 'assets/img5.jpg';
  public url6 = 'assets/img6.jpg';
  public url7 = 'assets/img7.jpg';
  public url8 = 'assets/img8.jpg';

  // Carousel configurations
  public bannerSlide: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 1 },
      940: { items: 1 }
    },
    nav: true
  };

  public testimonialSlider: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 1 }
    },
    nav: true
  };

  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 6 }
    },
    nav: false
  };

  public policyOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 3 }
    },
    nav: true
  };

  // ========== Constructor & Lifecycle Hooks ==========
  constructor(private http: HttpClient, private router: Router, private favouriteService: FavouriteService, private notificationService: NotificationService, private cartService: CartService, private cartPopupService: CartPopupService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.favouriteService.favourites$.subscribe(favourites => {
      this.favouriteProducts = favourites;
    });
  }
  public viewProductDetails(productId: number |  undefined): void {
if (productId) {
    this.router.navigate(['/product', productId]);
  }}

  public addToFavourites(product: Product): void {
    if (this.isFavourite(product)) {
      // Product is already in favourites, so remove it
      if (product.id !== undefined) { // Ensure product.id is not undefined
        this.favouriteService.removeFromFavourites(product.id);
        this.notificationService.show(`${product.name} has been removed from your favourites!`, 'info');
      } else {
        this.notificationService.show(`Cannot remove ${product.name}: Product ID is undefined.`, 'error');
      }
    } else {
      // Product is not in favourites, so add it
      this.favouriteService.addToFavourites(product);
      this.notificationService.show(`${product.name} has been added to your favourites!`, 'success');
    }
  }

  public isFavourite(product: Product): boolean {
    return this.favouriteProducts.some(fav => fav.id === product.id);
  }

  public addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.cartPopupService.showPopup(product);
  }

  // ========== Public Methods ==========
  public fetchProducts(): void {
    this.http.get<Product[]>('assets/products.json').subscribe({
      next: (data) => this.products = data,
      error: (error) => console.error('Error fetching products:', error)
    });
  }

  // Image change handlers
  public changeImage1(event: Event): void {
    this.url1 = (event.target as HTMLImageElement).src;
  }
  public changeImage2(event: Event): void {
    this.url2 = (event.target as HTMLImageElement).src;
  }
  public changeImage3(event: Event): void {
    this.url3 = (event.target as HTMLImageElement).src;
  }
  public changeImage4(event: Event): void {
    this.url4 = (event.target as HTMLImageElement).src;
  }
  public changeImage5(event: Event): void {
    this.url5 = (event.target as HTMLImageElement).src;
  }
  public changeImage6(event: Event): void {
    this.url6 = (event.target as HTMLImageElement).src;
  }
  public changeImage7(event: Event): void {
    this.url7 = (event.target as HTMLImageElement).src;
  }
  public changeImage8(event: Event): void {
    this.url8 = (event.target as HTMLImageElement).src;
  }

}
