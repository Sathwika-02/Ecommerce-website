import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, Review } from 'Interfaces/Product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000';
  fileName: string='';


  constructor(private http: HttpClient) {}

  getProductsByCategory(category: string): Observable<Product[]> {
    const url = `${this.apiUrl}/products/${category}/`;
    return this.http.get<Product[]>(url);
  }
  getProductsByTitle(title: string): Observable<Product[]> {
    const url = `${this.apiUrl}/product/${title}/`;
    return this.http.get<Product[]>(url);
  }
  getReviews(productTitle:string):Observable<Review[]>{
    const url1 = `${this.apiUrl}/reviewlist/${productTitle}/`;
    return this.http.get<Review[]>(url1);
  }
  getProductTitleById(productId: string): Observable<string> {
    const url = `http://127.0.0.1:8000/products/${productId}/`;
    return this.http.get<Product>(url).pipe(
      map((product: Product) => product.title)
    );
    
  }
  
}
