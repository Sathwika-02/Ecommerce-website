import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent  implements OnInit{
  public orderedProducts: any;
  constructor(private orderService: OrderService, private apiService: ApiService) { }
  ngOnInit(): void {
  this.orderedProducts = this.orderService.getOrderedProducts();
  }

  getUser(){
    return this.apiService.loguser$;
    
  }
  
  
 

}

