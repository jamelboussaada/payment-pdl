import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AdminSidebarComponent } from '../../../shared/admin-sidebar/admin-sidebar.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { Subscription } from 'rxjs';

interface Command {
  id: number;
  clientName: string;
  clientEmail:string
  date: string;
  totalPrice: number;
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

@Component({
  selector: 'app-billing-admin',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './billing-admin.component.html',
  styleUrl: './billing-admin.component.css'
})

export class BillingAdminComponent implements OnInit, OnDestroy {

  commands: Command[] = [];
  sidebarActive: boolean = true;
  private sidebarSubscription: Subscription = new Subscription();

  constructor(private http: HttpClient, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.loadCommands();
    this.sidebarSubscription = this.sidebarService.sidebarActive$.subscribe(active => {
      this.sidebarActive = active;
    });
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  loadCommands(): void {
    const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any[]>('http://localhost:8080/api/commands' , {headers}).subscribe(response => {
      this.commands = response.map(cmd => ({
        id: cmd.id,
        clientName: `${cmd.user.name} ${cmd.user.lastName}`,
        clientEmail: cmd.user.email,
        date: cmd.date,
        totalPrice: cmd.total,
        products: cmd.items.map((item: any) => ({
          name: item.nom,
          quantity: item.quantite,
          price: item.prix
        }))
      }));
    });
  }
}
