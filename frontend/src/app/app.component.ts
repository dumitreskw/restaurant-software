import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'restorant-web';

  constructor(private authService: AuthenticationService,
    private cookieService: CookieService,
    private router: Router) {

  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get username(): string {
    return this.authService.getUsername();
  }

  logout() {
    this.authService.logout().subscribe(res => this.router.navigateByUrl(''));
  }

  onCartClicked(): void {
    this.router.navigateByUrl('/shopping-cart');
  }

  onOrdersClicked() {
    this.router.navigateByUrl('/orders');
  }
}
