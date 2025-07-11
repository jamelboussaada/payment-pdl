import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { CartPopupComponent } from './shared/cart-popup/cart-popup.component';
import { AdminSidebarComponent } from './shared/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent, CartPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-ecommerce';
  loggedUserData: any;

  constructor() {
    const loggedData = sessionStorage.getItem("ecommerceUser");
    if(loggedData != null){
      this.loggedUserData = JSON.parse(loggedData)
    }
  }
}

