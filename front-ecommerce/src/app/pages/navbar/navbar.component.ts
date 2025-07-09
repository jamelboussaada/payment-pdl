import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService: AuthService) { }

  log() {
    console.log('Routing triggered');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token'); // Check for 'token' directly
  }

  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
  }

}
