import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'Interfaces/Product';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { DialogService } from 'src/app/services/dialog.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LocationService } from 'src/app/services/location.service';
import { CartItem } from 'src/app/shared/cart-item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  images = [
    { url: 'https://m.media-amazon.com/images/I/410fQEmY4tL._SY445._SX._UX._SY._UY_.jpg' },
    { url: 'https://m.media-amazon.com/images/I/410fQEmY4tL._SY445._SX._UX._SY._UY_.jpg' },
    { url: 'https://m.media-amazon.com/images/I/410fQEmY4tL._SY445._SX._UX._SY._UY_.jpg' }
  ];
  stars: number[] = [1, 2, 3, 4, 5];

  pincode: string='';
  locationData: any;
  
  minValue = 0;
  maxValue = 28000;
  sliderValue = 0;
  selectedDeliveryOptions: number[] = [];

  onSliderChange(event: any) {
    console.log('Slider Value:', this.sliderValue);
  }
  
  startValue: number = 300;
  endValue: number = 400;

  onStartChange(value: string) {
    this.startValue = Number(value);
  }

  onEndChange(value: string) {
    this.endValue = Number(value);
  }



  products:Product[]=[];
  filteredProducts: Product[] = [];

  searchKey:string="";
  public filterCategory:any;
  public productList:any;
  constructor(private api:ApiService,private cartservice:CartService,private http:HttpClient,private dialogservice:DialogService,private locationService:LocationService){}
  ngOnInit():void{
    
   /*this.api.getproduct().subscribe(res=>{
    this.productList=res;
    this.filterCategory=res;
    this.filteredProducts=res;
    this.productList.forEach((a:any) => {
      Object.assign(a,{quantity:1,total:a.price})
      
    });
    
    
   })*/
   this.api.getProduct().subscribe((res: Product[]) => {
    this.productList = res;
    this.filteredProducts = res;
    this.filterCategory=res;
  });

   this.cartservice.search.subscribe((value:any)=>{
    this.searchKey=value;
   })
  }
  sort(event: any): void {
    const order = event?.target?.value;
    if (order === 'default') {
      // Reset the filteredProducts array to contain all products
      return this.filteredProducts = this.productList;
    }
    else if (order === 'asc') {
      this.filteredProducts.sort((p1: Product, p2: Product) => {
        const p1DiscountedPrice = p1.price - (p1.price * p1.discount);
        const p2DiscountedPrice = p2.price - (p2.price * p2.discount);
        return p1DiscountedPrice - p2DiscountedPrice;
      });
    } else if (order === 'dsc') {
      this.filteredProducts.sort((p1: Product, p2: Product) => {
        const p1DiscountedPrice = p1.price - (p1.price * p1.discount);
        const p2DiscountedPrice = p2.price - (p2.price * p2.discount);
        return p2DiscountedPrice - p1DiscountedPrice;
      });
    }
  
    else if (order === 'rating') {
      this.filteredProducts.sort((p1: Product, p2: Product) => {
        return p2.rating - p1.rating;
      });
    } else if (order === 'popularity') {
      this.filteredProducts.sort((p1: Product, p2: Product) => {
        return p2.popularity - p1.popularity;
      });
    }
  
    
  }
  filterByPriceRange(start: number, end: number): void {
    this.startValue = start;
    this.endValue = end;
    
    // Filter the products based on the discounted price range
    this.filteredProducts = this.productList.filter((product:any) => {
      const discountedPrice = product.price - (product.price * product.discount);
      return discountedPrice >= start && discountedPrice <= end;
    });
  }

  
    filter(category:string){
       this.filteredProducts=this.productList.filter((a:any)=>{
        if(a.category === category || category ==''){
          return a;
        }
       });
    }
    openDialog(item: any) {
      this.dialogservice.openDialog().then((result: boolean) => {
        if (result) {
          this.AddToCart(item);
        }
      });
    }

    filterrange() {
      this.filteredProducts = this.productList.filter((product: Product) => {
        return product.price >= this.minValue && product.price <= this.sliderValue;
      });
    }
    filterrange1() {
      this.filteredProducts = this.productList.filter((product: Product) => {
        return product.price >= this.startValue && product.price <= this.endValue;
      });
    }

  getLocation() {
    this.locationService.getLocationByPincode(this.pincode).subscribe(
      (data) => {
        this.locationData = data;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
  filterProductsByRange(): void {
    this.filteredProducts = this.productList.filter((product: Product) => {
      const discountedPrice = product.price - (product.price * product.discount);
      return discountedPrice >= this.startValue && discountedPrice <= this.endValue;
    });
  }
  filterByDiscountRange(discount: number): void {
    this.filteredProducts = this.productList
      .filter((product: Product) => {
        const discountPercentage = product.discount * 100;
        return discountPercentage >= discount && discountPercentage <= 100;
      })
      .sort((a: Product, b: Product) => {
        return b.discount - a.discount;
      });
  }
  
  filterProductsByDeliveryDate(deliveryDate: number): void {
    this.filteredProducts = this.productList.filter((product:any) => product.delivery_day === deliveryDate);
  }
  filterProductsByDeliveryDateG(deliveryDate: number): void {
    this.filteredProducts = this.productList.filter((product:any) => product.delivery_day >= deliveryDate);
  }
  handleDeliveryCheckbox(option: number): void {
    const index = this.selectedDeliveryOptions.indexOf(option);
  
    if (index > -1) {
      this.selectedDeliveryOptions.splice(index, 1); // Remove the option from the selected options array
    } else {
      this.selectedDeliveryOptions.push(option); // Add the option to the selected options array
    }
  
    if (this.selectedDeliveryOptions.length === 0) {
      this.filteredProducts = this.productList; // Show all products if no options are selected
    } else {
      this.filteredProducts = this.productList.filter((product: any) =>
        this.selectedDeliveryOptions.includes(product.delivery_day)
      );
    }
  }
  
  getStars(rating: number): number[] {
    const roundedRating = Math.round(rating); // Round the rating to the nearest whole number
    return Array(roundedRating).fill(0);
  }
  getRelatedItems(category: string) {
    this.filteredProducts = this.productList.filter((item: any) => {
      return item.category === category;
    });
  }
  /*AddToCart(theProduct:Product){
    console.log(`Adding to cart:${theProduct.title},${theProduct.price}`)
    const thecartitem=new CartItem(theProduct);
    this.cartservice.addcart(thecartitem);
  }*/
  AddToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.title}, ${theProduct.price}`);
    const theCartItem: CartItem = new CartItem(theProduct);
    this.cartservice.addCartItem(theCartItem).subscribe(
      response => {
        console.log('Item added to cart successfully');
        // Handle success cases or display success message
      },
      error => {
        console.error('Error adding item to cart:', error);
        // Handle error cases or display error message
      }
    );
  }
  /*
  AddToCart(item: any): void {
    this.cartservice.addcart(item)
      .subscribe(
        response => {
          console.log('Item added to cart:', response);
          // You can handle success actions here, such as displaying a success message
        },
        error => {
          console.log('Error adding item to cart:', error);
          // You can handle error actions here, such as displaying an error message
        }
      );
  }*/
  ratingFilter: number = 0; 
  filterByRating(rating: number) {
    this.ratingFilter = rating; // Set the rating filter value
    
    // Apply the filter
    this.filteredProducts = this.productList.filter((product:any) => {
      return product.rating >= rating;
    });
  }
    
    
}

 