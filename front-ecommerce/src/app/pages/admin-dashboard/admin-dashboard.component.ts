import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from "../../shared/admin-sidebar/admin-sidebar.component";
import { SidebarService } from '../../core/services/sidebar.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule, AdminSidebarComponent]
})
export class AdminDashboardComponent {
  
  sidebarActive: boolean = true;
  private sidebarSubscription: Subscription = new Subscription();

  constructor(private sidebarService: SidebarService, private http: HttpClient, ) { }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarActive$.subscribe(active => {
      this.sidebarActive = active;
    });
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

}
