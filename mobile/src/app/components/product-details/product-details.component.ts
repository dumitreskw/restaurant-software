import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/models/product-model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent  implements OnInit {
  product!: Product;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  cancel() {
    
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
