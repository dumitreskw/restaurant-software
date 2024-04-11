import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/overview/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TokenVerifyComponent } from './components/auth/token-verify/token-verify.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/overview/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AdminOverviewComponent } from './components/admin/admin-overview/admin-overview.component';
import { ProductCardComponent } from './components/admin/products/product-card/product-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { ProductModalComponent } from './components/admin/products/product-modal/product-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MenuComponent } from './components/overview/menu/menu.component';
import { ContactComponent } from './components/overview/contact/contact.component';
import { NgEventBus } from 'ng-event-bus';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import { ShoppingCartComponent } from './components/overview/shopping-cart/shopping-cart.component';
import { BookATableComponent } from './components/overview/book-a-table/book-a-table.component';
import { AddressModalComponent } from './components/profile/address-modal/address-modal.component';
import { MatRadioModule } from '@angular/material/radio';
import { OrdersComponent } from './components/profile/orders/orders.component';
import {MatTableModule} from '@angular/material/table';
import { ProductPageComponent } from './components/overview/product-page/product-page.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TokenVerifyComponent,
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    NavbarComponent,
    AdminOverviewComponent,
    ProductCardComponent,
    ProductModalComponent,
    MenuComponent,
    ContactComponent,
    ShoppingCartComponent,
    BookATableComponent,
    AddressModalComponent,
    OrdersComponent,
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        allowedDomains: ["localhost"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
        
      },
    }),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatRadioModule,
    MatTableModule,
    MatAutocompleteModule
  ],
  providers: [
    NgEventBus,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
