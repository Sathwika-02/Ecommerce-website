import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Faq } from 'Interfaces/Product';
import { FAQService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  @Input() productTitle!: string;
  faqs: Faq[] = [];
  newQuestion: string = '';
  questionForm!: FormGroup;

  constructor(private faqService: FAQService,private formBuilder: FormBuilder) {
  }
}