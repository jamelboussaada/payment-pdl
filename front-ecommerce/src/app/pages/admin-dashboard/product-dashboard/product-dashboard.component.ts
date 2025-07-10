import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../../../shared/admin-sidebar/admin-sidebar.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: number;
  name: string;
  description: string;
  prix: number;
  quantite: number;
  imageUrl: string;
}

@Component({
  selector: 'app-product-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent],
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent implements OnInit, OnDestroy {
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    prix: 0,
    quantite: 0,
    imageUrl: ''
  };

  products: Product[] = [];
  private nextId: number = 1;
  sidebarActive: boolean = true;
  private sidebarSubscription: Subscription = new Subscription();

  constructor(private sidebarService: SidebarService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts();
    this.sidebarSubscription = this.sidebarService.sidebarActive$.subscribe(active => {
      this.sidebarActive = active;
    });
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  loadProducts(): void {
    this.http.get<Product[]>('http://localhost:8080/api/produits').subscribe(data => {
      this.products = data;
    });
  }
  addProduct(): void {
    if (this.newProduct.name && this.newProduct.prix > 0 && this.newProduct.imageUrl && this.newProduct.quantite >= 0) {
      this.http.post<Product>('http://localhost:8080/api/produits', this.newProduct)
      .subscribe((newProd: Product) => {
        this.products.push(newProd);
        this.newProduct = { id: 0, name: '', description: '', prix: 0, quantite: 0, imageUrl: '' };
        console.log('Product added:', newProd);
      });
    } else {
      alert('Please fill in all product details correctly.');
    }
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.newProduct.imageUrl = reader.result as string;
      };
    }
  }

  clearImage(): void {
    this.newProduct.imageUrl = '';
  }

  editProduct(product: Product): void {
    console.log('Edit product:', product);
  }

  deleteProduct(productId: number): void {
    this.http.delete(`http://localhost:8080/api/produits/${productId}`).subscribe(() => {
      this.products = this.products.filter(p => p.id !== productId);
      console.log('Product deleted');
    });
  }
}