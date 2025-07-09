import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  log() {
  console.log('Routing triggered');
}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('ecommerceUser');
  }

  logout(): void {
    sessionStorage.removeItem('ecommerceUser');
    // Optionally, navigate to login page or home page after logout
  }

}
