import { Injectable, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderedProducts: any[] = [];
  constructor(private http: HttpClient, private apiService: ApiService) { }
  addOrderedProduct(product: any) {
    for (const prod of product) {
      const orderId = uuidv4();
      prod.id = orderId;
      //prod.vendorName = this.apiService.loguser$;
      this.apiService.loguser$.subscribe(user => {
        if (user) {
        prod.user = user
        console.log(`Logged in user's username in order service: ${prod.user}`)
        // Use the username as needed
        }
        });
     // prod.user=this.apiService.loguser$;
      this.orderedProducts.push(prod);
      this.saveOrderedProduct(prod);
    }
  }
  
  getOrderedProducts() {
    let customerName='';
    this.apiService.loguser$.subscribe(user => {
      if (user) {
        customerName = user;
        console.log(`customerName in getOrderedProd is: ${customerName}`);
      }
    });
    //console.log(`Ordered products in get: ${this.orderedProducts}`);
    //return this.orderedProducts.filter((product) => product.custName == customerName);
    this.http.get('http://127.0.0.1:8000/order/')
      .subscribe({
        next: response => {
          this.orderedProducts = response as any[];
        },
        error: error => {
          console.error('Failed to save ordered product:', error);
        }
      });
      
    return this.orderedProducts.filter(
      (product) => product.user == customerName
    );
  }


  clearOrderedProducts() {
    this.orderedProducts = [];
  }
  saveOrderedProduct(product: any) {
    this.http.post('http://127.0.0.1:8000/order/', product)
      .subscribe({
        next: response => {
          console.log('Ordered product saved successfully:', response);
        },
        error: error => {
          console.error('Failed to save ordered product:', error);
        }
      });
  }

  saveShippingAddress(product:any){
    this.http.post('http://127.0.0.1:8000/addresses/', product)
    .subscribe({
      next: response => {
        console.log('Ordered product saved successfully:', response);
      },
      error: error => {
        console.error('Failed to save ordered product:', error);
      }
    });
  }
  getShippingProducts(product:any){
    let customerName='';
    this.apiService.loguser$.subscribe(user => {
      if (user) {
        customerName = user;
        console.log(`customerName in getOrderedProd is: ${customerName}`);
      }
    });
    //console.log(`Ordered products in get: ${this.orderedProducts}`);
    //return this.orderedProducts.filter((product) => product.custName == customerName);
    this.http.get('http://127.0.0.1:8000/addresses/')
      .subscribe({
        next: response => {
          this.orderedProducts = response as any[];
        },
        error: error => {
          console.error('Failed to save ordered product:', error);
        }
      });
      
    return this.orderedProducts.filter(
      (product) => product.user == customerName
    );
  }
}