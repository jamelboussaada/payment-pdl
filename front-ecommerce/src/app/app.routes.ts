import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { FavouriteComponent } from './pages/favourite/favourite.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SuccessPurchaseComponent } from './pages/successpurchase/successpurchase.component';
import { FailedPurchaseComponent } from './pages/failedpurchase/failedpurchase.component';
import { ProductDescriptionComponent } from './pages/product-description/product-description.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProductDashboardComponent } from './pages/admin-dashboard/product-dashboard/product-dashboard.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'cart', component: CartComponent },
    { path: 'favourite', component: FavouriteComponent },
    { path: 'login', component: LoginComponent },
    { path: 'success', component: SuccessPurchaseComponent },
    { path: 'fail', component: FailedPurchaseComponent },
    { path:'product/:id', component: ProductDescriptionComponent},
    { path:'forgot-password', component: ForgotPasswordComponent},
    { path:'reset-password', component: ResetPasswordComponent},
    { path:'admin/dashboard', component: ProductDashboardComponent},
    { path:'invoices', component: InvoicesComponent},
    { path:'admin/products', component: ProductDashboardComponent},
];