import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
