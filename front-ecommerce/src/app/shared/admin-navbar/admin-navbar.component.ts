import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

  constructor(private router: Router) { }

  logout(): void {
    // Implement your logout logic here
    console.log('Admin Logout clicked!');
    // Example: Clear token, redirect to login page
    this.router.navigate(['/login']);
  }
}
