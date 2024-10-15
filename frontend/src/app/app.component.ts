import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ProductsService } from './services/products.service';
import { ProductName } from './models/product-with-name';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormGroup } from '@angular/forms';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from './constants/event-names';
import { map, Observable, startWith } from 'rxjs';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;
  title = 'restorant-web';
  options: any[] = [];
  products: ProductName[] = [];
  showSearchbar = true;
  searchControl = new FormControl('');
  filteredOptions!: Observable<ProductName[]>;
  formGroup!: FormGroup;

  allProducts: any[] | undefined;
  filteredProducts: any[] = [];

  constructor(private authService: AuthenticationService,
    private productsService: ProductsService,
    private router: Router,
    private eventBus: NgEventBus
  ) {

  }

  ngOnInit(): void {
    this.initializeMenu();
    this.getProducts();

    this.formGroup = new FormGroup({
      searchControl: this.searchControl
    })

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  filterProducts(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.allProducts as any[]).length; i++) {
        let country = (this.allProducts as any[])[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.filteredProducts = filtered;
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

  onMyTicketsClicked() {
    this.router.navigateByUrl('/my-tickets');
  }

  onMyReservationsClicked() {
    this.router.navigateByUrl('/my-reservations');
  }

  onProductSelected() {
    const value = this.searchControl.value;
    const id = (value as any).id;
    
    if(id){
      this.router.navigate(['/product', {id: id}])
      this.eventBus.cast(EVENT_NAME.PRODUCT_SELECTED, { id });

      this.searchControl.setValue(null);
    }
  }

  getProducts(): void {
    this.productsService.getProductsNames().subscribe({
      next: (res) => {
        this.products = res.names
        this.allProducts = res.names
      },
      complete: () => {this.showSearchbar = true;},
      error: (err) => {
        console.error(err);
        this.showSearchbar = false;
      }
    });
  }

  private initializeMenu(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        link: '/home'
      },
      {
        label: 'Menu',
        icon: 'pi pi-book',
        link: '/menu'
      },
      {
        label: 'Reservations',
        icon: 'pi pi-calendar-clock',
        link: '/book-table'
      },
      {
        label: 'Support',
        icon: 'pi pi-users',
        link: '/support',
        authorization: 'true'
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-bolt',
        link: '/dashboard',
        authorization: 'true'
      },
    ];
  }
}
