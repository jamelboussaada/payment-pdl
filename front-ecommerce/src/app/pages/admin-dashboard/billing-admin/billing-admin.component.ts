import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AdminSidebarComponent } from '../../../shared/admin-sidebar/admin-sidebar.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-billing-admin',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './billing-admin.component.html',
  styleUrl: './billing-admin.component.css'
})
export class BillingAdminComponent implements OnInit, OnDestroy {
  commands: any[] = [];
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
    // Placeholder for API call to fetch command data
    // Replace with your actual API endpoint
    this.http.get<any[]>('http://localhost:8080/api/commands').subscribe(data => {
      this.commands = data;
    }, error => {
      console.error('Error fetching commands:', error);
    });
  }
}
