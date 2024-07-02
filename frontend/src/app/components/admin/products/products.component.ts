import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from '../../../constants/event-names';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = []
  constructor(private productsService: ProductsService,
    public dialog: MatDialog,
    private eventBus: NgEventBus) {
    
  }
  ngOnInit(): void {
    this.getProducts();
    this.subscribeToProductsUpdated();
  }

  private getProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => this.products = res.products,
      complete: () => console.log(this.products),
      error: (err) => console.log(err)
    })
  }

  private subscribeToProductsUpdated(): void {
    this.eventBus.on(EVENT_NAME.UPDATE_PRODUCTS).subscribe(a => {
      this.getProducts();
    })
  }

  onOpenDialog() {
      this.dialog.open(ProductModalComponent);
  }
}
