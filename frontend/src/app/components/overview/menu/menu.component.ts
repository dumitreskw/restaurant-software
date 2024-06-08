import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { CategoryModel } from '../../../models/category-model';
import { ProductsService } from '../../../services/products.service';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from '../../../constants/event-names';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  categories!: CategoryModel[];
  firstMenu: boolean = false;
  filteredProducts: Product[] = [];
  activeCategory!: string;
  allCategory!: string;
  allProducts: Product[] = [];
  threshold: number = 0.5;
  searchControl = new FormControl('');
  ascendingOrder!: boolean;

  constructor(private productsService: ProductsService,
    private eventBus: NgEventBus) {}

  ngOnInit(): void {
    this.getAllProducts();
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

  private getAllProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => this.allProducts = res.products,
      complete: () => {
        this.allCategory = "All";
        this.filteredProducts = this.allProducts;
        this.activeCategory = this.allCategory;
       },
      error: (err) => console.log(err)
    })
  }

  private subscribeToProductsUpdated(): void {
    this.eventBus.on(EVENT_NAME.UPDATE_PRODUCTS).subscribe(a => {
      this.getAllCategoriesWithProducts();
    })
  }

  onCategoryClick(category: CategoryModel) {
    this.activeCategory = category.category;
    this.filteredProducts = category.products;
  }

  onAllCategoryClick() {
    this.activeCategory = this.allCategory;
    this.filteredProducts = this.allProducts;
  }

  private searchProducts(term: string, ascending?: boolean): Product[] {
    if(ascending) {
      return this.allProducts.map(product => {
        const similarity = this.calculateAverageSimilarity(product.description, term);
        return { ...product, similarity };
      })
      .filter(s => s.similarity > this.threshold)
      .sort((a, b) => a.similarity - b.similarity);
    }
    this.ascendingOrder = false;
    return this.allProducts.map(product => {
        const similarity = this.calculateAverageSimilarity(product.description, term);
        return { ...product, similarity };
    })
    .filter(s => s.similarity > this.threshold)
    .sort((a, b) => b.similarity - a.similarity);
}

  sortFiltered() {
    this.ascendingOrder = !this.ascendingOrder;

    if(!!this.searchControl.value) {
      this.filteredProducts = this.filteredProducts.reverse();
    }
  }

private calculateAverageSimilarity(description: string, term: string): number {
  const termWords = term.toLowerCase().split(' ').filter(word => word.trim() !== '');
  const descriptionWords = description.toLowerCase().split(' ').filter(word => word.trim() !== '');

  let totalSimilarity = 0;
  let totalWords = 0;

  termWords.forEach(termWord => {
      let maxSimilarity = 0; 
      descriptionWords.forEach(descriptionWord => {
          const similarity = this.calculateSimilarity(descriptionWord, termWord);
          maxSimilarity = Math.max(maxSimilarity, similarity);
      });
      if (maxSimilarity >= this.threshold) {
        totalSimilarity += maxSimilarity;
        totalWords++;
    }

  });

  return totalWords > 0 ? totalSimilarity / totalWords : 0;
}

private calculateSimilarity(word1: string, word2: string): number {
  const distance = this.levenshteinDistance(word1, word2);

  const maxPossibleDistance = Math.max(word1.length, word2.length);
  return 1 - (distance / maxPossibleDistance);
}

  private levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= a.length; i++) {
        matrix[i] = [];
        matrix[i][0] = i;
    }
    for (let j = 0; j <= b.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, 
                matrix[i][j - 1] + 1, 
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[a.length][b.length];
  }

  onSearchByDescription() {
    if(this.searchControl.value) {
      this.filteredProducts = this.searchProducts(this.searchControl.value as string);
    }
  }
}
