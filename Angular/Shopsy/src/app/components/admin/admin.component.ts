import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  faqs: any[] = [];
  ngOnInit(): void {
    this.fetchFAQs();
  }
  constructor(private http:HttpClient,private toastr:ToastrService){}
  fetchFAQs(): void {
    this.http.get<any>('http://127.0.0.1:8000/faqs/').subscribe(
      response => {
        console.log(response);
        this.faqs = response;
      },
      error => {
        console.error(error);
      }
    );
  }
  updateFAQs(): void {
    const updatedFaqs = this.faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }));

    const body = {
      faqs: updatedFaqs
    };

    this.http.put<any>('http://127.0.0.1:8000/faqs/', body).subscribe(
      response => {
        console.log(response);
        this.toastr.success('FAQ updated successfully', 'Success');
        
      },
      error => {
        console.error(error);

      }
    );
  }
  
  

}
