import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItem } from '../shared/cart-item';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private apiUrl = 'http://127.0.0.1:8000/api/cart-items/';
   cartItems:CartItem[]=[];
   totalPrice:Subject<number>=new Subject<number>();
   totalQuantity:Subject<number>=new Subject<number>();
   public search = new BehaviorSubject<string>("");
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  constructor(private http:HttpClient) { }
  addcart(thecartitem:CartItem){
    let alreadyexistsincart:boolean=false;
    let existingcartitem: CartItem | undefined;
    existingcartitem=this.cartItems.find((tempcartitem) => tempcartitem.id === thecartitem.id);
      alreadyexistsincart=existingcartitem!=undefined;
    if(alreadyexistsincart){
      existingcartitem!.quantity+=thecartitem.quantity;
    }
    else{
      this.cartItems.push(thecartitem);
    }
    this.computeCartTotal();

  }
  addCartItem(cartItem: CartItem) {
    return this.http.post(this.apiUrl, cartItem);
  }
  /*addcart(items: { product: any, quantity: number }[]): Observable<any> {
    const url = `${this.apiUrl}/add-to-cart/`;
    const payload = {
      items: items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity
      })),
      user_email: "sathwika@gmail.com"
    };
  
    return this.http.post<any>(url, payload);
  }*/
  
  computeCartTotal() {
    let totalPRiceVal:number=0;
    let totalQuantityVal:number=0;
    for(let currentcartitem of this.cartItems){
      totalPRiceVal+=currentcartitem.quantity*currentcartitem.unitPrice;
      totalQuantityVal+=currentcartitem.quantity;
    }

    this.totalPrice.next(totalPRiceVal);
    this.totalQuantity.next(totalQuantityVal);
    this.logCartData(totalPRiceVal,totalQuantityVal);
  }
  logCartData(totalPRiceVal: number, totalQuantityVal: number) {
    console.log('contents of the cart');
    for(let temp of this.cartItems){
      const subtotal=temp.quantity*temp.unitPrice;
      console.log(`${temp.name},quantity:${temp.quantity},price:${temp.unitPrice},subtotal:${subtotal},${totalQuantityVal}`);

    }
  }
  incremen(thecartitem:CartItem){
    thecartitem.quantity++;
    this.computeCartTotal();
  }
  decrem(thecartitem:CartItem){
    thecartitem.quantity--;
    if(thecartitem.quantity===0){
      this.remove(thecartitem);
    }
    else{
      this.computeCartTotal();
    }
  }
  remove(thecartitem:CartItem){
    const itemidx=this.cartItems.findIndex(temp=>temp.id===thecartitem.id);
    if(itemidx>-1){
      this.cartItems.splice(itemidx,1);
      this.computeCartTotal();
    }
  } 
  /*
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
     
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
*/


}
