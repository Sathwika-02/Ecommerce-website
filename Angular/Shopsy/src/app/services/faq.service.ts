import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Faq } from 'Interfaces/Product';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FAQService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}
  createFaq(faq: Faq): Observable<Faq> {
    return this.http.post<Faq>(`${this.apiUrl}/faqs/`, faq);
  }
  

  getFaqs(productTitle: string): Observable<Faq[]> {
    return this.http.get<Faq[]>(`${this.apiUrl}/faqs/?product_title=${productTitle}`);
  }

  updateFaq(faq: Faq): Observable<Faq> {
    return this.http.put<Faq>(`${this.apiUrl}/faqs/?product_title=${faq.productTitle}`, faq);
  }

  getAnsweredFAQsByProductTitle(productTitle: string): Observable<Faq[]> {
    const url = `${this.apiUrl}/faqs/?productTitle=${productTitle}&status=answered`;
    return this.http.get<Faq[]>(url);
  }
}
