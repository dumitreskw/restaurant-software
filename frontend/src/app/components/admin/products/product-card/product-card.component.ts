import { Component, Input, afterNextRender } from '@angular/core';
import { Product } from '../../../../models/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ProductsService } from '../../../../services/products.service';
import { CartService } from '../../../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() inEdit: boolean = false;
  priceString: string = '';
  image: string = 'http://localhost:3000/images/no-image.jpg';
  
  constructor(public dialog: MatDialog,
    private authService: AuthenticationService,
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private snackbar: MatSnackBar,
    private messageService:MessageService) {
    let dummyProduct = new Product();
    dummyProduct.name = 'Telescop';
    dummyProduct.description = 'ceva descriere 123 4 5 6';
    dummyProduct.price = 10.22;

    if (!this.product) {
      this.product = dummyProduct;
    }
  
    this.priceString = `${this.product.price.toString()} RON`
  }

  onDelete() {
    this.productsService.deleteProduct(this.product._id as string).subscribe(
      res => window.location.reload()
    );
    
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onOpenDialog() {
    if(this.authService.isAdmin()){
      const productId = this.product._id;
      this.dialog.open(ProductModalComponent, {
        data: {
          productId: productId,
        },
      });

      console.log(this.product)
    }
    else {
      this.router.navigate(['/product', {id: this.product._id}])
    }
  }

  addItem() {
    this.cartService.addToCart(this.product._id as string).subscribe({
      next: (res) => {
        if(res.success) {
          this.showConfirmation(`Product ${this.product.name} added to cart`);
        }
      },
      error: (error) => {
        console.error(error);
        this.snackbar.open("There was an error adding this item to cart");
      }
    })

  }

  showConfirmation(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
}
