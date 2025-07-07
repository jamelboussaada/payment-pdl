import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router'; // Add this import


@Component({
  selector: 'app-home-page',
  standalone: true, // ✅ Required for Angular 17+
  imports: [CarouselModule, RouterModule], // ✅ Import CarouselModule directly
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {

  url1: string = "assets/img1.jpg";
  url2: string = "assets/img2.jpg";
  url3: string = "assets/img3.jpg";
  url4: string = "assets/img4.jpg";
  url5: string = "assets/img5.jpg";
  url6: string = "assets/img6.jpg";
  url7: string = "assets/img7.jpg";
  url8: string = "assets/img8.jpg";

  changeImage1(event: any) { this.url1 = event.target.src; }
  changeImage2(event: any) { this.url2 = event.target.src; }
  changeImage3(event: any) { this.url3 = event.target.src; }
  changeImage4(event: any) { this.url4 = event.target.src; }
  changeImage5(event: any) { this.url5 = event.target.src; }
  changeImage6(event: any) { this.url6 = event.target.src; }
  changeImage7(event: any) { this.url7 = event.target.src; }
  changeImage8(event: any) { this.url8 = event.target.src; }

  bannerSlide: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 1 },
      940: { items: 1 }
    },
    nav: true
  };

  testimonialSlider: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 1 }
    },
    nav: true
  };


  partnersArray: any = [
    {
      imgName: "../assets/partner/p1.png"
    },
    {
      imgName: "../assets/partner/p4.png"
    },
    {
      imgName: "../assets/partner/p2.png"
    },
    {
      imgName: "../assets/partner/p5.png"
    },
    {
      imgName: "../assets/partner/p3.png"
    },
    {
      imgName: "../assets/partner/p6.png"
    }
  ];

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 6 }
    },
    nav: false
  };

  policyOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 3 }
    },
    nav: true
  };


}
