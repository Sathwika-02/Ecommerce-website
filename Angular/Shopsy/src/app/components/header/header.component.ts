import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import fetch from 'node-fetch';
import { MatDialog } from '@angular/material/dialog';
import { PincodeDialogComponent } from '../pincode-dialog/pincode-dialog.component';
import { LocationService } from 'src/app/services/location.service';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username!: string;
  pincode: string='';
  locationData: any;
  isGetLocationVisible = true;

  mycontrol=new FormControl('');
  productTitles:string[] = [];
  options: { id: number, title: string }[] = [];
  filteredOptions:Observable<String[]> | undefined;
   public searchTerm:string='';
   totalItemNumber:number=0;
   productMap: Map<string, number> = new Map<string, number>();
   searchControl = new FormControl();
  products: any;
   constructor(private cartservice:CartService,private http:HttpClient,private locationService:LocationService,private dialog:MatDialog,private authService:AuthService,private router:Router,private loginservice:LoginService){
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
   }

  
  
  
   ngOnInit():void{
    this.fetchData();
    this.updateCartStatus();
    
   }
   fetchData(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/products/')
      .subscribe(
        data => {
          this.options = data.map(item => {
            return { id: item.id, title: item.title };
          });
          console.log(this.options);
        },
        error => {
          console.error('Error:', error);
        }
      );
  }
  
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.options
      .filter(option => this._normalizeValue(option.title).includes(filterValue))
      .map(option => option.title);
  }
  
  private _normalizeValue(value: string): string {
    return value.trim().toLowerCase();
  }
  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartservice.search.next(this.searchTerm);
   }
   
   openPincodeDialog(): void {
    const dialogRef = this.dialog.open(PincodeDialogComponent, {
      width: '400px',
      height: '170px',
      data: { pincode: this.pincode },
      panelClass: 'pincode-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pincode = result;
        this.getLocation();
      }
    });
  }

  getLocation() {
    this.locationService.getLocationByPincode(this.pincode).subscribe(
      (data) => {
        this.locationData = data;
        this.isGetLocationVisible = false;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
  extractLocality(formattedAddress: string): string {
    const parts = formattedAddress.split(', ');
    return parts[0];
  }
  extractPincode(formattedAddress: string): string {
    const pincodePattern = /\b\d{6}\b/;
    const match = formattedAddress.match(pincodePattern);
    return match ? match[0] : '';
  }
  totalPrice:number=0;
  totalQuantity:number=0;
  updateCartStatus() {
    this.cartservice.totalPrice.subscribe(
      data=>this.totalPrice=data
    );
   //subscribe to cart totlaprice
   this.cartservice.totalQuantity.subscribe(
    data=>this.totalQuantity=data
   );
  }
  getProductIdAndRedirect(option: String): void {
    const selectedOption = this.options.find(item => item.title === option);
    if (selectedOption) {
      const productId = selectedOption.id;
      this.router.navigate(['/detail', productId]);
    }
  }
  isLoggedIn(): boolean {
    return LoginService.getLoginStatus();
  }

  getUsername(): string {
    return LoginService.getUsername();
  }
  logout(): void {
    this.router.navigateByUrl('/login');
    LoginService.setLoginStatus(false);
    LoginService.setUsername('');
  }
  isSignupOrLoginRoute(): boolean {
    const currentUrl: string = this.router.url;
    return currentUrl.includes('/signup') || currentUrl.includes('/login') || currentUrl.includes('/admin') || currentUrl.includes('/unauthorized');
  }


 
}
