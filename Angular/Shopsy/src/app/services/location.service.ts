import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://api.opencagedata.com/geocode/v1/json';
  private apiKey = 'f25a1125de42489ea8beeffc3a18cfce'; 

  constructor(private http: HttpClient) { }

  getLocationByPincode(pincode: string): Observable<any> {
    const params = {
      q: pincode + ', India',
      key: this.apiKey
    };

    return this.http.get(this.apiUrl, { params });
  }
}
