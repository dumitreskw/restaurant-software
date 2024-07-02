import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart, CartItem } from '../../../models/cart';
import { AddressService } from '../../../services/address.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressModalComponent } from '../../profile/address-modal/address-modal.component';
import { FormControl, Validators } from '@angular/forms';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from '../../../constants/event-names';
import { Subject, takeUntil } from 'rxjs';
import { InvoiceService } from '../../../services/invoice.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart: Cart = new Cart();
  addresses: any[] = [];
  addressControl: FormControl = new FormControl('', Validators.required);
  selectedAddress: any;
  private onComponentDestroy: Subject<any> = new Subject<any>();

  constructor(
    private cartService: CartService,
    private addressService: AddressService,
    private invoiceService: InvoiceService,
    public dialog: MatDialog,
    private eventBus: NgEventBus,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCart();
    this.getAddresses();
    this.subscribeToAddressAdded();
  }

  ngOnDestroy(): void {
    this.onComponentDestroy.next(null);
  }

  onAddOne(item: CartItem) {
    this.cartService.addOne(item.product._id as string)
    .pipe(takeUntil(this.onComponentDestroy))
    .subscribe({
      complete: () => {
        this.getCart();
      },
      error: (error) => console.error(error),
    });
  }

  onDeleteOne(item: CartItem) {
    this.cartService.deleteOne(item.product._id as string)
    .pipe(takeUntil(this.onComponentDestroy))
    .subscribe({
      complete: () => {
        this.getCart();
      },
      error: (error) => console.error(error),
    });
  }

  onDeleteItem(item: CartItem) {
    this.cartService.deleteItem(item.product._id as string)
    .pipe(takeUntil(this.onComponentDestroy))
    .subscribe({
      complete: () => {
        this.getCart();
      },
      error: (error) => console.error(error),
    });
  }

  onOpenAddAddress() {
    this.dialog.open(AddressModalComponent);
  }

  private getCart() {
    this.cartService.getCart()
    .pipe(takeUntil(this.onComponentDestroy))
    .subscribe({
      next: (res) => {
        this.cart = res;
      },
      error: (error) => console.error(error),
    });
  }

  private getAddresses() {
    this.addressService.getAddresses()
    .pipe(takeUntil(this.onComponentDestroy))
    .subscribe({
      next: (res) => (this.addresses = res),
      error: (err) => console.error(err),
    });
  }

  get packagingFee() {
    return this.cart.totalItems ? this.cart.totalItems * 2 : 0;
  }

  get totalFee() {
    const totalPrice = this.cart.totalPrice + 5 + this.packagingFee + 2;
    return totalPrice ? totalPrice : 0;
  }

  onCheckout() {
    this.invoiceService.createInvoice()
    .subscribe({
      next: (res) => (console.log(res)),
      complete: () => {
        this.showConfirmation("Payment confirmed successfully.")
        this.router.navigateByUrl('/orders')},
      error: (err) => console.error(err)
    })
  }

  private subscribeToAddressAdded(): void {
    this.eventBus
      .on(EVENT_NAME.ADD_ADDRESS)
      .pipe(takeUntil(this.onComponentDestroy))
      .subscribe(() => this.getAddresses());
  }

  showConfirmation(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
}
