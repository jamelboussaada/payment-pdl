import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../../../shared/admin-navbar/admin-navbar.component';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

@Component({
  selector: 'app-product-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbarComponent],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent implements OnInit {
  newProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    imageUrl: '',
    stock: 0
  };

  products: Product[] = [];
  private nextId: number = 1;

  constructor() { }

  ngOnInit(): void {
    // Load existing products (e.g., from a service or local storage)
    this.loadProducts();
  }

  loadProducts(): void {
    // Simulate loading from a backend or local storage
    // In a real app, you'd fetch this from a service
    this.products = [
      { id: 1, name: 'Laptop Pro', price: 1200, imageUrl: 'assets/img1.jpg', stock: 50 },
      { id: 2, name: 'Gaming Mouse', price: 75, imageUrl: 'assets/img2.jpg', stock: 200 },
      { id: 3, name: 'Mechanical Keyboard', price: 150, imageUrl: 'assets/img3.jpg', stock: 100 }
    ];
    this.nextId = Math.max(...this.products.map(p => p.id)) + 1;
  }

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price > 0 && this.newProduct.imageUrl && this.newProduct.stock >= 0) {
      this.newProduct.id = this.nextId++;
      this.products.push({ ...this.newProduct });
      // Reset form
      this.newProduct = {
        id: 0,
        name: '',
        price: 0,
        imageUrl: '',
        stock: 0
      };
      console.log('Product added:', this.products);
      // In a real app, you'd send this to a service/backend
    } else {
      alert('Please fill in all product details correctly.');
    }
  }

  // Placeholder for edit and delete functionality
  editProduct(product: Product): void {
    console.log('Edit product:', product);
    // Implement edit logic (e.g., populate form with product data)
  }

  deleteProduct(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
    console.log('Product deleted. Remaining products:', this.products);
    // In a real app, you'd send this to a service/backend
  }
}
