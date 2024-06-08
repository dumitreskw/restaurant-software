import { Component, Input, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from 'src/app/constants/events';
import { Product } from 'src/app/models/product-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent  implements OnInit {
  @Input() product!: Product;
  @Input() isFood!: boolean;
  constructor(private eventBus: NgEventBus) { }

  ngOnInit() {
  }

  onDetailsClicked() {
    this.eventBus.cast(EVENT_NAME.PRODUCT_DETAILS, {product: this.product})
  }
}
