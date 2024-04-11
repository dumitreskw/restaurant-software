import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ProductsService } from './services/products.service';
import { ProductName } from './models/product-with-name';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from './constants/event-names';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'restorant-web';
  options: any[] = [];
  products: ProductName[] = [];
  showSearchbar = false;
  searchControl = new FormControl('');
  filteredOptions!: Observable<ProductName[]>;

  constructor(private authService: AuthenticationService,
    private cookieService: CookieService,
    private productsService: ProductsService,
    private router: Router,
    private eventBus: NgEventBus
  ) {

  }

  ngOnInit(): void {
    this.getProducts();

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): any {
    const filterValue = value.toLowerCase();

    return this.products.filter(option => option.name.toLowerCase().includes(filterValue));
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

  onProductSelected() {
    const value = this.searchControl.value;
    const id = this.products.find(a => a.name == value)?.id;

    
    if(id){
      this.router.navigate(['/product', {id: id}])
      this.eventBus.cast(EVENT_NAME.PRODUCT_SELECTED, { id });

      this.searchControl.setValue(null);
    }
  }

  getProducts(): void {
    this.productsService.getProductsNames().subscribe({
      next: (res) => this.products = res.names,
      complete: () => {this.showSearchbar = true;},
      error: (err) => {
        console.error(err);
        this.showSearchbar = false;
      }
    });
  }
}
