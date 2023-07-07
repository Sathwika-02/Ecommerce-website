import { Component } from '@angular/core';
import { Product } from 'Interfaces/Product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { CartItem } from 'src/app/shared/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  cartItems:CartItem[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;
  total:number=0;
  items:Product[]=[];
  public products : any = [];
  public grandTotal : number=0;
  constructor(private cartService : CartService,private OrderService:OrderService) { }

  ngOnInit(): void {
    this.cartItems=this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data
    );

    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    );
  
    this.cartService.computeCartTotal();
    /*
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })*/
    this.listCartDetails();
  }
  
  
  /*removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  */
  listCartDetails(){
    this.cartItems=this.cartService.cartItems;
    console.log(this.cartItems)
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data
    );

    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    );

    this.cartService.computeCartTotal();
  }
  increment(thecartitem:CartItem){
    this.cartService.incremen(thecartitem);
  }
  decrement(thecartitem:CartItem){
    this.cartService.decrem(thecartitem);
  }
  remove(thecartitem:CartItem){
    this.cartService.remove(thecartitem);
  }
  check(Items: any){
    console.log("check");
    console.log(Items);
    this.OrderService.addOrderedProduct(Items);
    
  }
 

}