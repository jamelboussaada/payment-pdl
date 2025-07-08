import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { FavouriteComponent } from './pages/favourite/favourite.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SuccessPurchaseComponent } from './pages/successpurchase/successpurchase.component';
import { FailedPurchaseComponent } from './pages/failedpurchase/failedpurchase.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'cart', component: CartComponent },
    { path: 'favourite', component: FavouriteComponent },
    { path: 'login', component: LoginComponent },
    { path: 'success', component: SuccessPurchaseComponent },
    { path: 'fail', component: FailedPurchaseComponent },
    { path: 'forgotpassword', component: ForgotpasswordComponent },
];