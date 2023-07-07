import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})

export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  token: string;

  constructor(private fb: FormBuilder, private http: HttpClient,private route:ActivatedRoute,private router:Router,private toastrService:ToastrService) {
    this.forgotPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    this.token='';
  }
  passwordsDoNotMatch(): boolean {
    const password = this.forgotPasswordForm.get('password')?.value;
    const confirmPassword = this.forgotPasswordForm.get('confirmPassword')?.value;
    return password !== confirmPassword;
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!;
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const password = this.forgotPasswordForm.get('password')?.value;
      const requestBody = {
        // Pass the token obtained from the URL
        password: password
      };
  

      // Send password update request to Django API endpoint
      this.http.post<any>(`http://127.0.0.1:8000/update-password/?token=${this.token}`, requestBody)
        .subscribe(
          response => {
            // Handle success response
            console.log(response);
            this.router.navigateByUrl('/login');
            this.toastrService.success(
              'Password Updated Successfully'
            )
          },
          error => {
            // Handle error response
            console.error(error);
          }
        );
    }
  }
}
