import { Component, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from 'src/app/constants/events';
import { MENU_TYPE } from 'src/app/constants/menu-type';
import { Category } from 'src/app/models/category-model';
import { Product } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  drinks: Category[] = [];
  food: Category[] = [];
  displayedCategory: Category[] = [];
  constructor(private productService: ProductService,
    private eventBus: NgEventBus
  ) { }

  ngOnInit() {
    //this.getAllProducts();
    this.getCategoriesWithProducts();
    this.subscribeToMenuTypeChanged();
  }

  isFoodCategory(category: Category): boolean {
    return category.type != MENU_TYPE.DRINKS;
  }

  getAllProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res) => this.products = res.products,
      complete: () => console.log(),
      error: (error) => console.error(error)
    });
  }

  getCategoriesWithProducts(): void {
    this.productService.getCategoriesWithProductsCap().subscribe({
      next: (res) => this.categories = res.data.categories,
      complete: () => this.initializeCategories(),
      error: (error) => console.error(error)
    });
  }

  initializeCategories(): void {
    this.categories.forEach(c => {
      if(c.type == MENU_TYPE.DRINKS) {
        this.drinks.push(c);
      }  else {
        this.food.push(c);
      }
    })

    this.displayedCategory = this.food;
  }

  private subscribeToMenuTypeChanged() {
    this.eventBus.on(EVENT_NAME.MENU_CHANGED).subscribe((data) => {
      const menuType = (data.data as any).data;

      this.displayedCategory = menuType == MENU_TYPE.FOOD ? this.food : this.drinks;
    })
  }
}
