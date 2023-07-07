import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FAQService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-post-question-dialog-component',
  templateUrl: './post-question-dialog-component.component.html',
  styleUrls: ['./post-question-dialog-component.component.css']
})
export class PostQuestionDialogComponentComponent {
  questionForm: FormGroup;
  producttitle!: string;

  constructor(
    private dialogRef: MatDialogRef<PostQuestionDialogComponentComponent>,
    private formBuilder: FormBuilder,
    private faqservice:FAQService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.questionForm = this.formBuilder.group({
      question: ['', Validators.required],
    });
    this.producttitle=data.productTitle
  }


  onSubmit(): void {
    if (this.questionForm.invalid) {
      return;
    }

    const question = this.questionForm.value.question;
    this.faqservice.createFaq({
      productTitle: this.producttitle,
      question,
      answer: 'N/A',
      status: 'pending'
    }).subscribe(
      (response) => {
        console.log('Question submitted successfully');
        this.dialogRef.close();
      },
      (error) => {
        console.log(error);
        
        console.error('Error submitting the question:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
