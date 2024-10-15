import { Component, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from '../constants/events';
import { Product } from '../models/product-model';
import { ModalController } from '@ionic/angular';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { MENU_TYPE } from '../constants/menu-type';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  currentCategory: string = MENU_TYPE.FOOD;
  constructor(private eventBus: NgEventBus,
    private modalCtrl: ModalController 
  ) {}

  ngOnInit(): void {
      this.subscribeToProductDetailsModal();
  }

  private subscribeToProductDetailsModal() {
    this.eventBus.on(EVENT_NAME.PRODUCT_DETAILS).subscribe((product) => {
      this.openModal((product.data as any).product);
    })
  }

  async openModal(product: Product) {
    const modal = await this.modalCtrl.create({
      component: ProductDetailsComponent,
      componentProps: {
        product: product
      }
    });
    modal.present();
  }

  onFoodMenu() {
    if(this.currentCategory != MENU_TYPE.FOOD) {
      this.currentCategory = MENU_TYPE.FOOD;
      this.sendMenuChangedEvent(MENU_TYPE.FOOD);
    }
  }

  onDrinksMenu() {
    if(this.currentCategory != MENU_TYPE.DRINKS) {
      this.currentCategory = MENU_TYPE.DRINKS;
      this.sendMenuChangedEvent(MENU_TYPE.DRINKS);
    }
  }

  private sendMenuChangedEvent(menuType: MENU_TYPE) {
    this.eventBus.cast(EVENT_NAME.MENU_CHANGED, {data: menuType});
  }
}
