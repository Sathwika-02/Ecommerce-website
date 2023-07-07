import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpserviceService {
  private baseURL = 'http://127.0.0.1:8000/verify-otp/';

  constructor(private http: HttpClient) {}

  verifyOTP(otp: string): Observable<any> {
    const url = `${this.baseURL}`;
    const payload = { otp };
    return this.http.post<any>(url, payload);
  }
}
 
