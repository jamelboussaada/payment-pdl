import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AdminSidebarComponent } from '../../../shared/admin-sidebar/admin-sidebar.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { Subscription } from 'rxjs';
import { BillingAdminComponent } from "../billing-admin/billing-admin.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, BillingAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalCommands: number = 0;
  pendingCommands: number = 0;
  completedCommands: number = 0;
  sidebarActive: boolean = true;
  loading: boolean = true; // Add loading property
  private sidebarSubscription: Subscription = new Subscription();

  constructor(private http: HttpClient, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.loadCommandStatistics();
    this.sidebarSubscription = this.sidebarService.sidebarActive$.subscribe(active => {
      this.sidebarActive = active;
    });
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  loadCommandStatistics(): void {
    this.loading = true; // Set loading to true before fetching
    // Placeholder for API call to fetch command statistics
    // Replace with your actual API endpoint
    this.http.get<any>('http://localhost:8080/api/commands/statistics').subscribe(data => {
      this.totalCommands = data.totalCommands || 0;
      this.pendingCommands = data.pendingCommands || 0;
      this.completedCommands = data.completedCommands || 0;
      this.loading = false; // Set loading to false after data is loaded
    }, () => {
      this.loading = false; // Also set to false on error
    });
  }
  
}