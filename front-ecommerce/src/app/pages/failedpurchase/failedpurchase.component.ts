import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-failedpurchase',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './failedpurchase.component.html',
  styleUrl: './failedpurchase.component.css'
})
export class FailedpurchaseComponent {

}
