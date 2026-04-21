import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ProductList } from './pages/product-list/product-list';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';
import { Orders } from './pages/orders/orders';
import { Profile } from './pages/profile/profile';
import { NotFound } from './components/not-found/not-found';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },

    { path: 'login', component: Login },
    { path: 'register', component: Register },

    { path: 'products', component: ProductList },
    { path: 'products/:id', component: ProductDetail },

    { path: 'cart', component: Cart, canActivate: [authGuard] },
    { path: 'orders', component: Orders, canActivate: [authGuard] },
    { path: 'profile', component: Profile, canActivate: [authGuard] },

    { path: '**', component: NotFound }
];