import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from '../services/product.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgEventBus } from 'ng-event-bus';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [MenuComponent, ProductComponent, ProductDetailsComponent],
  exports: [MenuComponent, ProductComponent],
  providers: [ProductService, NgEventBus]
})
export class ComponentsModule {}
