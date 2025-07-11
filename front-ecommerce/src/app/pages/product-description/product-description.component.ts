import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CartService } from '../../core/services/cart.service';
import { CartPopupService } from '../../core/services/cart-popup.service';
import { RouterModule } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  prix: number;
  imageUrl: string;
  description: string;
  quantite: number;
}

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent, RouterModule],
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.css'
})
export class ProductDescriptionComponent implements OnInit{
  product: Product | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cartService: CartService,
    private cartPopupService: CartPopupService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (!productId) {
      this.error = 'Product ID not found';
      this.isLoading = false;
      return;
    }
    this.fetchProductDetails(productId);
  }

  private fetchProductDetails(productId: string): void {
    this.isLoading = true;
    this.error = null;

    const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Product>(`http://localhost:8080/api/produits/${productId}`, { headers }).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.error = 'Failed to load product details';
        this.isLoading = false;
      }
    });
  }

  addToCart(event: Event): void {
    event.preventDefault(); // Prevent default anchor tag behavior
    console.log('Add to cart button clicked.');
    if (this.product) {
      console.log('Product exists:', this.product);
      this.cartService.addToCart(this.product);
      this.cartPopupService.showPopup(this.product);
    } else {
      console.log('Product is null or undefined. Cannot add to cart.');
    }
  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }

}


