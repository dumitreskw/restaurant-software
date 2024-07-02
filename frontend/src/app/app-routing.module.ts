import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/overview/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { adminGuard } from './guards/admin.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { AdminOverviewComponent } from './components/admin/admin-overview/admin-overview.component';
import { MenuComponent } from './components/overview/menu/menu.component';
import { ContactComponent } from './components/overview/contact/contact.component';
import { TokenVerifyComponent } from './components/auth/token-verify/token-verify.component';
import { ShoppingCartComponent } from './components/overview/shopping-cart/shopping-cart.component';
import { BookATableComponent } from './components/overview/book-a-table/book-a-table.component';
import { OrdersComponent } from './components/profile/orders/orders.component';
import { ProductPageComponent } from './components/overview/product-page/product-page.component';
import { MyReservationsComponent } from './components/profile/my-reservations/my-reservations.component';
import { MyTicketsComponent } from './components/profile/my-tickets/my-tickets.component';
import { AdminTicketsComponent } from './components/admin/admin-tickets/admin-tickets.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'support', component: ContactComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'book-table', component: BookATableComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'my-reservations', component: MyReservationsComponent},
  {path: 'my-tickets', component: MyTicketsComponent},
  {path: 'dashboard', 
    component: DashboardComponent,
    canActivate:[adminGuard],
    children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: AdminOverviewComponent, canActivate:[adminGuard]},
      {path: 'users', component:  UsersComponent, canActivate:[adminGuard]},
      {path: 'tickets', component:  AdminTicketsComponent, canActivate:[adminGuard]},
      {path: 'products', component:  ProductsComponent, canActivate:[adminGuard]},
    ]
  },
  {path: "product", component: ProductPageComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "verify", component: TokenVerifyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
