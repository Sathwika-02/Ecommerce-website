import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Faq, Product, Review, SmallImage } from 'Interfaces/Product';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/shared/cart-item';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReviewformComponent } from '../reviewform/reviewform.component';
import { FAQService } from 'src/app/services/faq.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { PostQuestionDialogComponentComponent } from '../post-question-dialog-component/post-question-dialog-component.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { NgImageSliderModule } from 'ng-image-slider';




@Component({
  selector: 'app-product-det',
  templateUrl: './product-det.component.html',
  styleUrls: ['./product-det.component.css']
})

export class ProductDetComponent implements OnInit {
  productId!: number;
  reviews: Review[]=[];
  filteredProducts: Product[] = [];
  filteredProducts1: Product[] = [];
  public productList:any;
  productData:Product;
  productQuantity:number=1;
  searchKey:string="";
  smallImages: SmallImage[]=[];
  mediaPreview: string | null = null;
  @ViewChild('reviewDialogTemplate', { static: true }) reviewDialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  sortedReviews: Review[]=[]; 
  imageGridReviews: Review[] = [];
  faqs: Faq[] = [];
  newQuestion: string = '';
  questionForm!: FormGroup;
  producttitle!:string;
  productTitle!: string; 
  filteredFaqs: Faq[] = [];
  searchKeyword: string = '';
  showResults: boolean = false;
  isExpanded: boolean[] = [];
  showMoreQuestionsClicked: boolean = false;


  
  constructor(private api:ApiService,private activatedroute:ActivatedRoute,private product:ProductService,private http:HttpClient,private router:Router,private dialogservice:DialogService,private cartservice:CartService,private dialog:MatDialog,private faqservice:FAQService,private formBuilder:FormBuilder){
    this.productData = {} as Product;
    this.questionForm = this.formBuilder.group({
      question: ['', Validators.required],
    });
  }

  
  ngOnInit(): void {
    this.initializeAccordionState();
    /*this.activatedroute.paramMap.subscribe(params => {
      const productTitle = params.get('productTitle');
      console.log(productTitle);
      if (productTitle) {

        this.fetchReviews(this.productTitle);
        this.getAnsweredFAQs(productTitle);
      }
      
    });*/
    this.activatedroute.paramMap.subscribe((params) => {
      const productId = params.get('productid');
      console.log(productId);
      if (productId) {
        this.getProductDetails(productId);
        this.getProductTitle(productId);
      }
    });
    this.loadFaqs(); 
  }
  initializeAccordionState() {
    this.isExpanded = Array(this.faqs.length).fill(true);
  }
  updateImageGridReviews() {
    this.imageGridReviews = this.reviews.filter(review => review.media);
    console.log(this.imageGridReviews);
  }
  onSortChange(event:any): void {
    const selectedValue= event?.target?.value;
    if (selectedValue === 'rating') {
      this.sortByRating();
    } else if (selectedValue === 'recent') {
      this.sortByRecent();
    } 
  }
  sortByRating() {
    this.reviews.sort((a, b) => b.rating - a.rating);
    
  }
  sortByRecent() {
    const timestamp = new Date().getTime(); 
    this.reviews.forEach((review, index) => {
      review.tempId = timestamp + index; 
    });
    this.reviews.sort((a, b) => {
      if (a.tempId && b.tempId) {
        return b.tempId - a.tempId; 
      }
     
      return 0; 
    });
  }
  openReviewDialog(review: any) {
    this.dialogRef = this.dialog.open(this.reviewDialogTemplate, {
      width: '600px',
      height: '400px',
      data: { review: review } 
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
  

  getProductTitle(productId:string):void{
    this.product.getProductTitleById(productId).subscribe(
      (title: string) => {
        console.log(title);
        this.fetchReviews(title);
        this.getAnsweredFAQs(title);
        this.getRelatedImages(title);
        this.producttitle=title;
        console.log(this.producttitle);
      },
      (error: any) => {
        console.error('Error fetching product title:', error);
      }
    );
  }

  
  getProductDetails(productId: string): void {
    const apiUrl = `http://127.0.0.1:8000/products/${productId}/`; 
  
    this.http.get(apiUrl).subscribe(
      (response: any) => {
      
        console.log(response); 
        console.log(response.title);
        this.getRelatedImages(response.title);
        this.productData = response;
        this.getSmallImages(this.productData.smallImages);
        console.log(this.productData.category);
        this.getRelatedProducts(this.productData.category);
        this.getRelatedImages(this.productData.title);
      },
      (error: any) => {
        // Handle the error here
        console.error(error);
      }
    );
  }

  getSmallImages(smallImages: SmallImage[]): void {
    this.smallImages = smallImages;
  }
  

  getRelatedProducts(category: string): void {
    this.product.getProductsByCategory(category).subscribe(
      (res: Product[]) => {
        console.log(res);
        this.filteredProducts = res.filter(product => product.id !== this.productData.id);
        console.log(this.filteredProducts);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  getRelatedImages(title: string): void {
    this.product.getProductsByTitle(title).subscribe(
      (res: Product[]) => {
        console.log(res);
        this.filteredProducts1= res.filter(product => product.title === title && product.id !== this.productData.id);
        console.log(this.filteredProducts1);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  
  
  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }
    else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }
 
  changeProductColor(color: string): void {
    this.productData.color = color;
  }
  redirectToProduct(productId: string): void {
    this.router.navigate(['/detail', productId]);
  }
  resetProductColor(product: Product): void {
    product.hovered = false;
  }
  
  
  
  
  

 
  
  changeProductImage(event: MouseEvent, imageUrl: string) {
    const productImg = document.getElementById('productImg') as HTMLImageElement;
    productImg.src = imageUrl;
  }

  getStars(rating: number): number[] {
    const roundedRating = Math.round(rating); 
    return Array(roundedRating).fill(0);
  }
  
  filter(category:string){
    this.filteredProducts=this.productList.filter((a:any)=>{
     if(a.category === category || category ==''){
       return a;
     }
    });
 }
 navigateToDetail(productId: string) {
  this.router.navigateByUrl(`/detail/${productId}`);
}
openDialog(item: any) {
  this.dialogservice.openDialog().then((result: boolean) => {
    if (result) {
      this.AddToCart(item);
    }
  });
}
AddToCart(theProduct:Product){
  console.log(`Adding to cart:${theProduct.title},${theProduct.price}`)
  const thecartitem=new CartItem(theProduct);
  this.cartservice.addcart(thecartitem);
}

openReviewFormDialog(): void {
  const dialogRef = this.dialog.open(ReviewformComponent, {
    width: '700px',
    data: { productTitle: this.productData.title }
  });

  dialogRef.afterClosed().subscribe((result) => {
   
    if (result) {
    }
  });
}

fetchReviews(productTitle: string): void {
  const url = `http://127.0.0.1:8000/reviewlist/${productTitle}/`;

  this.http.get<Review[]>(url).subscribe(
    (response) => {
      this.reviews = response;
      this.updateImageGridReviews();
      console.log(this.reviews);
    },
    (error) => {
      console.error('Error fetching reviews:', error);
    }
  );
  }

  
  getFileName(): string {
    return this.product.fileName;
  }
  
  

getStarRatingWidth(rating: number): string {
  const starWidthPercentage = (rating / 5) * 100;
  return `${starWidthPercentage}%`;
}

loadFaqs(): void {
  this.faqservice.getFaqs(this.productTitle)
      .subscribe(faqs => {
          this.faqs = faqs;
      });
}

getAnsweredFAQs(productTitle: string): void {

    const url = `http://127.0.0.1:8000/faqs/${productTitle}/?status=answered`;

    this.http.get<Faq[]>(url).subscribe(
      (response) => {
        this.faqs = response;
        console.log(this.faqs);
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
}
searchFAQs() {
  if (this.searchKeyword) {
    this.filteredFaqs = this.faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        faq.answer.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
    this.showResults = true;
  } else {
    this.filteredFaqs = [];
    this.showResults = false;
  }
  
  
}
openPostQuestionDialog(): void {
  const dialogRef = this.dialog.open(PostQuestionDialogComponentComponent, {
    width:'550px',
    height:'280px',
    data: {
      productTitle: this.producttitle
    }
  });
}


selectFAQ(faq: Faq) {
  this.searchKeyword = faq.question;
  this.showResults = false;
}
toggleAccordion(index: number) {
  this.isExpanded[index] = !this.isExpanded[index];
}
openProductDialog(): void {
  const dialogRef = this.
  dialog.open(ProductDialogComponent, {
    width: '1500px',
    height:'650px',
    data: {
      smallImages: this.productData.smallImages,
      title: this.productData.title,
      color: this.productData.color,
      mainImage: this.productData.image,
      id:this.productData.id
    }
  });
}
getImageUrls(): { image: string, title: string, price: string }[] {
  return this.filteredProducts.map(item => ({
    image: item.image,
    title: item.title,
    price: item.price.toString()
  }));
}
showMoreQuestions() {
  this.showMoreQuestionsClicked = true;
}

showLessQuestions() {
  this.showMoreQuestionsClicked = false;
}




}

