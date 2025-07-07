import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {CartComponent} from './pages/cart/cart.component';

export const routes: Routes = [

    {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path:'home-page',
    component: HomePageComponent

  },

  {
    path:'cart',
    component: CartComponent

  }

];
