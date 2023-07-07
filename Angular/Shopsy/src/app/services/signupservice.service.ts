import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {
  private email!: string;
  constructor() { }
  
  setEmail(email: string) {
    this.email = email;
  }
  
  getEmail() {
    return this.email;
  }
}
