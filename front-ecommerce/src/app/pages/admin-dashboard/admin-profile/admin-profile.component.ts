import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../../../shared/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const sidenav_trigger = document.querySelector("[sidenav-trigger]");
    const sidenav_close = document.querySelector("[sidenav-close]");
    const sidenav = document.getElementById("sidenav-main");
    const body = document.getElementsByTagName("body")[0];

    if (sidenav_trigger && sidenav && sidenav_close) {
      sidenav_trigger.addEventListener("click", function () {
        body.classList.add("g-sidenav-pinned");
      });

      sidenav_close.addEventListener("click", function () {
        body.classList.remove("g-sidenav-pinned");
      });
    }

    const navbar_profile = document.querySelector("[navbar-profile]");
    const navbar_scroll = document.querySelector("[navbar-scroll]");

    if (navbar_profile && navbar_scroll) {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 10) {
          navbar_profile.classList.add("blur");
          navbar_profile.classList.add("shadow-md");
          navbar_scroll.setAttribute("navbar-scroll", "true");
        } else {
          navbar_profile.classList.remove("blur");
          navbar_profile.classList.remove("shadow-md");
          navbar_scroll.setAttribute("navbar-scroll", "false");
        }
      });
    }

    const dropdown_trigger = document.querySelectorAll("[dropdown-trigger]");

    dropdown_trigger.forEach((trigger) => {
      trigger.addEventListener("click", function (this: HTMLElement) {
        const dropdown_menu = this.nextElementSibling as HTMLElement;
        if (dropdown_menu) {
          dropdown_menu.classList.toggle("opacity-0");
          dropdown_menu.classList.toggle("pointer-events-none");
          dropdown_menu.classList.toggle("transform-dropdown");
        }
      });
    });
  }

}