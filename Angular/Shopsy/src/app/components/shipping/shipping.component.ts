import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})

export class ShippingComponent {
 addressForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private apiService:ApiService) {}

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.addressForm.valid) {

      let customerName='';
    this.apiService.loguser$.subscribe(user => {
      if (user) {
        customerName = user;
        console.log(`customerName in getOrderedProd is: ${customerName}`);
      }
    });
    
      const addressData = this.addressForm.value;
      console.log(addressData);
      this.http.post('http://127.0.0.1:8000/addresses/', addressData)
        .subscribe(
          response => {
            console.log('Address added successfully:', response);
            this.addressForm.reset();
          },
          error => {
            console.log(error);
            console.error('Failed to add address:', error);
          }
        );
    } else {
      
    }
  }

}