import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, user } from 'Interfaces/Product';
import { Observable, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  /*getproduct(){
    return this.http.get("http://localhost:3000/productList").pipe(map((res:any)=>{
      return res;
    }))
  }*/
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('http://127.0.0.1:8000/products/');
  }
   
  private loguserSubject = new BehaviorSubject<string>('');
  public loguser$ = this.loguserSubject.asObservable();
  setLogUser(loguser: string){
    this.loguserSubject.next(loguser); 
  }
}
