import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private static isLoggedIn = false;
  private static username:string;
  private  static isAdmin = false; 

  constructor() { }

  static setLoginStatus(status: boolean): void {
    this.isLoggedIn = status;
  }

  static getLoginStatus(): boolean {
    return this.isLoggedIn;
  }
  static setUsername(username: string): void {
    this.username = username;
  }

 static  getUsername(): string {
    return this.username;
  }
  static setIsAdmin(value: boolean): void {
    this.isAdmin = value;
  }
  static getIsAdmin():boolean{
    return this.isAdmin;
  }
  
}
