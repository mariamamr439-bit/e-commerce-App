import { CategoryDetailsComponent } from './features/category-details/category-details.component';
import { BrandDetailsComponent } from './features/brand-details/brand-details.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then((c) => c.ShopComponent),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then((c) => c.CategoriesComponent),
  },
  {
    path: 'categoryDetails/:slug/:id',
    loadComponent: () =>
      import('./features/category-details/category-details.component').then((c) => c.CategoryDetailsComponent),
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then((c) => c.BrandsComponent),
  },
  {
    path: 'brandDetails/:slug/:id',
    loadComponent: () =>
      import('./features/brand-details/brand-details.component').then((c) => c.BrandDetailsComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent),
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent),
    canActivate: [authGuard],
  },
  {
    path: 'details/:slug/:id',
    loadComponent: () =>
      import('./features/details/details.component').then((c) => c.DetailsComponent),
  },
  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./features/orders/orders.component').then((c) => c.OrdersComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'forgetPassword',
    loadComponent: () =>
      import('./features/forget-password/forget-password.component').then(
        (c) => c.ForgetPasswordComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
];
