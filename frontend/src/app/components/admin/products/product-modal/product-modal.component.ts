import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../../services/products.service';
import { CreateProductRequest } from '../../../../models/requests/create-product';
import { UpdateProductRequest } from '../../../../models/requests/update-product';
import { Subject, takeUntil } from 'rxjs';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from '../../../../constants/event-names';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent implements OnInit, OnDestroy {
  title: string = '';
  isEditable!: boolean;
  inEditMode: boolean = false;
  form!: FormGroup;
  imageUrl!: string;
  categories: string[] = [];
  productTypes: string[] = ["Food", "Drinks"];
  private product!: Product;
  private onComponentDestroy: Subject<void> = new Subject();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService,
    private eventBus: NgEventBus
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.setTitle();
    if (this.isEditable) {
      this.getProduct();
    }
    this.buildForm();
  }

  ngOnDestroy(): void {
      this.onComponentDestroy.next();
  }

  get isNewCategorySelected(): boolean {
    return this.categoryControl.value == 'Add new...';
  }

  get categoryControl() {
    return this.form.controls['category'] as FormControl;
  }

  get newCategoryControl() {
    return this.form.controls['newCategory'] as FormControl;
  }

  get typeControl() {
    return this.form.controls['type'] as FormControl;
  }

  get nameControl() {
    return this.form.controls['name'] as FormControl;
  }

  get descriptionControl() {
    return this.form.controls['description'] as FormControl;
  }

  get priceControl() {
    return this.form.controls['price'] as FormControl;
  }

  get imageControl() {
    return this.form.controls['image'] as FormControl;
  }

  setTitle(): void {
    this.isEditable = !!this.data;
    this.title = !this.isEditable ? 'Add new product' : 'Edit product';
  }

  onImageUpload(url: string) {
    this.imageUrl = url;
  }

  getCategories(): void {
    this.productsService
      .getCategories()
      .pipe(takeUntil(this.onComponentDestroy))
      .subscribe({
        next: (res) => this.categories = res.categories,
        complete: () => this.categories.push('Add new...'),
        error: (err) => {
          console.error(err);
          this.categories.push('Add new...');
        }
      });
  }

  addProduct(): void {
    let request = new CreateProductRequest();
    request.name = this.nameControl.value;
    request.price = this.priceControl.value;
    request.description = this.descriptionControl.value;
    request.categoryName =
      this.categoryControl.value == 'Add new...'
        ? this.newCategoryControl.value
        : this.categoryControl.value;
    request.type = this.typeControl.value;

    this.productsService
      .addProduct(request)
      .pipe(takeUntil(this.onComponentDestroy))
      .subscribe((res) => {
        this.eventBus.cast(EVENT_NAME.UPDATE_PRODUCTS);
      });
  }

  getProduct(): void {
    const id = this.data.productId;

    this.productsService
      .getProduct(id)
      .pipe(takeUntil(this.onComponentDestroy))
      .subscribe((res) => {
        this.product = res.product;
        this.setFormValues(res.product);
        this.form.disable();
      });
  }

  enableEditMode(): void {
    this.inEditMode = true;
    this.form.enable();
    this.categoryControl.disable();
  }

  disableEditMode(): void {
    this.inEditMode = false;
    this.form.disable();
    this.categoryControl.disable();
  }

  onSave(): void {
    let request = new UpdateProductRequest();
    request.id = this.product._id as string;
    request.description = this.descriptionControl.value;
    request.name = this.nameControl.value;
    request.price = this.priceControl.value;
    request.imageUrl = this.imageUrl;

    console.log(request)

    this.productsService
      .updateProduct(request)
      .pipe(takeUntil(this.onComponentDestroy))
      .subscribe((res) => {
        this.disableEditMode();
        this.eventBus.cast(EVENT_NAME.UPDATE_PRODUCTS);
      });
  }

  private setFormValues(product: any) {
    this.categoryControl.setValue(product.categoryName);
    this.descriptionControl.setValue(product.description);
    this.priceControl.setValue(product.price);
    this.nameControl.setValue(product.name);
  }

  private buildForm(): void {
    this.form = new FormGroup({
      category: new FormControl('', Validators.required),
      newCategory: new FormControl(''),
      type: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      image: new FormControl(''),
    });
  }
}
