import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of, throwError } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logoutEvent: EventEmitter<void> = new EventEmitter<void>();
  loginEvent:EventEmitter<void>=new EventEmitter<void>();
  private users: any[];

  constructor(private http: HttpClient, private router: Router, private apiService : ApiService) {
    this.users = [];
    this.fetchUsers();
  }
  fetchUsers(): void {
    this.http.get<any>('http://127.0.0.1:8000/signup/')
      .pipe(
        map(response => response.users)
        
      )
      .subscribe(users => {
        this.users = users;
        console.log(`users in fetchUsers: ${users.length}`)
      });
      
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    // this.loggedInUser = null;
    // this.setLoggedInUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('fname');
    this.router.navigate(['/login']);
    this.logoutEvent.emit();
    
  }
  

  login({ username, password }: any): Observable<any> {
    for(const use of this.users){
      console.log(`use.username is ${use.username}`);
    }
    const userr = this.users.find(u => u.username === username && u.password === password);
    if (userr) {
      console.log("Logged In user issssss:", userr.username)
      this.apiService.setLogUser(userr);
      // this.header.updateIsCustomer();
      this.setToken('abcdef');
      this.loginEvent.emit();
      return of(userr);
    } else {
      return throwError(new Error('Failed to Login'));
    }
  }
  getLoggedInUsername(): string | null {
    // console.log(`Logged in user's username is: ${this.loggedInUser}`)
    // return this.loggedInUser;
    const userToken = this.getToken();
    if (userToken) {
      // You may need to modify this logic based on how you store the user's information
      const user = this.users.find(u => u.token === userToken);
      console.log(`user with tokn is: ${user}`)
      if (user) {
        return user;
      }
    }
    return null;
  }
}