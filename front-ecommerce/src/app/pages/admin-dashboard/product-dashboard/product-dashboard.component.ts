import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AdminSidebarComponent} from '../../../shared/admin-sidebar/admin-sidebar.component';
import {SidebarService} from '../../../core/services/sidebar.service';
import {Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

interface Product {
  id?: number | null;
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
    id: null,
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

  editingProduct: Product | null = null;

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
    const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Product[]>('http://localhost:8080/api/produits', {headers}).subscribe(data => {
      this.products = data;
    });
  }

  addProduct(): void {
    if (
      this.newProduct.name &&
      this.newProduct.prix > 0 &&
      this.newProduct.imageUrl &&
      this.newProduct.quantite >= 0
    ) {
      const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token;

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.post<Product>(
        'http://localhost:8080/api/produits',
        this.newProduct,
        {headers}
      ).subscribe((newProd: Product) => {
        this.products.push(newProd);
        this.newProduct = {id: 0, name: '', description: '', prix: 0, quantite: 0, imageUrl: ''};
        console.log('Product added:', newProd);
      }, error => {
        console.error('Error adding product:', error);
        alert('Error: unauthorized or server issue.');
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
    this.editingProduct = { ...product };
    this.newProduct = { ...product };
  }


  deleteProduct(productId: number): void {
    const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`http://localhost:8080/api/produits/${productId}`, {headers}).subscribe(() => {
      this.products = this.products.filter(p => p.id !== productId);
      console.log('Product deleted');
    });
  }

  updateProduct(): void {
    if (!this.editingProduct) return;

    const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.put<Product>(
      `http://localhost:8080/api/produits/${this.editingProduct.id}`,
      this.newProduct,
      { headers }
    ).subscribe(updated => {
      const index = this.products.findIndex(p => p.id === updated.id);
      if (index > -1) this.products[index] = updated;

      this.newProduct = { id: 0, name: '', description: '', prix: 0, quantite: 0, imageUrl: '' };
      this.editingProduct = null;
    }, error => {
      console.error('Failed to update product:', error);
      alert('Failed to update product.');
    });
  }

  cancelEdit(): void {
    this.newProduct = { id: 0, name: '', description: '', prix: 0, quantite: 0, imageUrl: '' };
    this.editingProduct = null;
  }
}
