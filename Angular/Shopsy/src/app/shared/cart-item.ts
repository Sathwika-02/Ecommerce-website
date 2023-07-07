import { Product } from "Interfaces/Product";

export class CartItem {
    id:string;
    name:string;
    imageUrl:string;
    unitPrice:number;
    quantity:number;
    constructor(product:Product){
        this.id=product.id;
        this.name=product.title;
        this.imageUrl=product.image;
        this.unitPrice=product.price;
        this.quantity=1;
    }

}
