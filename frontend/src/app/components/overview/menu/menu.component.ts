import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { CategoryModel } from '../../../models/category-model';
import { ProductsService } from '../../../services/products.service';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from '../../../constants/event-names';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  categories!: CategoryModel[];

  constructor(private productsService: ProductsService,
    private eventBus: NgEventBus) {}

  ngOnInit(): void {
    this.getAllCategoriesWithProducts();
    this.subscribeToProductsUpdated();
  }

  getProductsInCategory(category: CategoryModel) {
    return category.products;
  }

  private getAllCategoriesWithProducts(): void {
    this.productsService.getCategoriesWithProducts().subscribe((res) => {
      this.categories = res.categories;
    });
  }

  private subscribeToProductsUpdated(): void {
    this.eventBus.on(EVENT_NAME.UPDATE_PRODUCTS).subscribe(a => {
      this.getAllCategoriesWithProducts();
    })
  }
}
