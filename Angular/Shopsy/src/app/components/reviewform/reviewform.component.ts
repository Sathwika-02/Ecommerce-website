import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Review } from 'Interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-reviewform',
  templateUrl: './reviewform.component.html',
  styleUrls: ['./reviewform.component.css']
})

export class ReviewformComponent {
  @Output() reviewAdded = new EventEmitter<Review>();
  reviewForm: FormGroup;
  selectedMedia: File | null = null;
  mediaPreview: string | null = null;
  reviews: Review[] = [];
  fileName: string='';
  constructor(
    private product:ProductService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ReviewformComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { productTitle: string },
    private http: HttpClient
  ) {
    this.reviewForm = this.formBuilder.group({
      author: ['', Validators.required],
      rating: [0, Validators.required],
      comment: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.product.fileName=file.name;

  // Here, you can store the fileName or perform any other actions you need
  console.log('Selected file name:', this.product.fileName);
  
    if (file) {
      this.selectedMedia = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.mediaPreview = reader.result as string;
      };
  
      if (this.selectedMedia instanceof Blob) {
        reader.readAsDataURL(this.selectedMedia); // Update this line
      }
  
      // Rest of your code...
    }
  }
  

  submitReview(): void {
    if (this.reviewForm.invalid) {
      return;
    }
  
    const newReview: Review = {
      productTitle: this.data.productTitle,
      author: this.reviewForm.value.author,
      rating: this.reviewForm.value.rating,
      comment: this.reviewForm.value.comment,
      media: {
        file: this.selectedMedia as File,
        preview: this.mediaPreview as string
      }
    };
  
    const formData = new FormData();
    formData.append('productTitle', newReview.productTitle);
    formData.append('author', newReview.author);
    formData.append('rating', newReview.rating.toString());
    formData.append('comment', newReview.comment);
    if (newReview.media && newReview.media.file) {
      formData.append('media', newReview.media.file);
    }
  
    this.http.post(`http://127.0.0.1:8000/review/`, formData).subscribe(
      (response:any) => {
        this.reviews.push(response);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error submitting review:', error);
      }
    );
  
    this.reviewForm.reset();
    this.selectedMedia = null;
    this.mediaPreview = null;
  }
  
  ngOnInit(): void {
  }
}