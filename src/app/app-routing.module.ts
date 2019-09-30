import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'salon-page/:id', loadChildren: './salon-page/salon-page.module#SalonPagePageModule' },
  { path: 'master-page/:id', loadChildren: './master-page/master-page.module#MasterPagePageModule' },
  { path: 'service-order/:id', loadChildren: './service-order/service-order.module#ServiceOrderPageModule', canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
  { path: 'categories/:name/:id', loadChildren: './categories/categories.module#CategoriesPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
