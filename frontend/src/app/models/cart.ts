import { Product } from "./product";

export class CartItem {
    product!: Product;
    quantity!: number;
    totalPrice!: number;
}

export class Cart {
    totalItems!: number;
    totalPrice!: number;
    items!: CartItem[];

    constructor() {
        this.items = []
    }
}

