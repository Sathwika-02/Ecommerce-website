import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  resetForm: FormGroup;
  passwordResetSent: boolean = false;


  constructor(private fb: FormBuilder, private http: HttpClient,private router:Router) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.resetForm.valid) {
      const email = this.resetForm.get('email')?.value;

      // Send password reset request to Django API endpoint
      this.http.post<any>('http://127.0.0.1:8000/resetpassword', { email })
        .subscribe(
          response => {
            console.log(response);
            this.resetForm.reset();
            this.passwordResetSent = true;
            //this.router.navigateByUrl('/success');
            // Show a success message or redirect to a confirmation page
          },
          error => {
            console.error(error);
            // Show an error message to the user
          }
        );
    }
  }
}
