import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from '../../../constants/event-names';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  productId!: string;
  product!: Product;
  showPage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private snackbar: MatSnackBar,
    private eventBus: NgEventBus,
    private messageService: MessageService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.subscribeToRouteChanged();
  }

  addToCart(): void {
    this.cartService.addToCart(this.productId).subscribe({
      next: (res) => {
        if (res.success) {
          this.showConfirmation(`Product ${this.product.name} added to cart`);
        }
      },
      error: (error) => {
        console.error(error);
        this.snackbar.open('There was an error adding this item to cart');
      },
    });
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  subscribeToRouteChanged(): void {
    this.eventBus.on(EVENT_NAME.PRODUCT_SELECTED).subscribe(a => {
      const data: any = a.data;

      this.getProduct(data.id as string)
    })
  }

  getProduct(id?: string): void {
    this.showPage = false;
    this.productId = id ? id :this.route.snapshot.paramMap.get('id') as string;
    if(!this.productId) {
      this.showPage = false;
      return;
    }

    this.productService.getProduct(this.productId).subscribe({
      next: (res) => {
        this.product = res.product;
      },
      complete: () => {
        this.showPage = true;
      },
      error: (err) => {
        console.error(err);
        this.showPage = false;
      },
    });
  }

  showConfirmation(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
}
