import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminSidebarComponent } from '../../../shared/admin-sidebar/admin-sidebar.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { ChangeDetectorRef } from '@angular/core';

export interface User {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  enabled: boolean;
  email: string;
  address: string;
}

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  users: User[] = [];
  sidebarActive: boolean = true;

  constructor(private http: HttpClient, private sidebarService: SidebarService ,private cd: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.sidebarService.sidebarActive$.subscribe(active => {
      this.sidebarActive = active;
    });

    this.loadUsers();
  }

  loadUsers(): void {
    const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<User[]>('http://localhost:8080/api/users', { headers })
      .subscribe(data => {
        this.users = data;
      }, error => {
        console.error('Failed to load users:', error);
      });
  }

  toggleUserStatus(user: User): void {
    const action = user.enabled ? 'disable' : 'enable';
    const confirmed = confirm(`Are you sure you want to ${action} the user ${user.name} ${user.lastName}?`);

    if (!confirmed) return;

    const token = JSON.parse(sessionStorage.getItem("ecommerceUser") || '{}').token;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const newStatus = !user.enabled;

    this.http.get(
      `http://localhost:8080/api/users/${user.id}/status/${newStatus}`,
      { headers, responseType: 'text' }
    )
      .subscribe(() => {
        user.enabled = newStatus;
        this.cd.detectChanges();
      }, error => {
        console.error('Failed to update user status:', error);
        alert('Failed to change user status.');
      });

  }

}
