import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpserviceService } from 'src/app/services/otpservice.service';
import { SignupserviceService } from 'src/app/services/signupservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.css']
})

export class OtpVerifyComponent {
  OtpForm!:FormGroup;
  email!: string;
  
  constructor(
    private fb:FormBuilder,
    private http: HttpClient,
    private router: Router,
    private signupService: SignupserviceService,
    private toastrService:ToastrService,
  ) {}

  ngOnInit() {
    this.email = this.signupService.getEmail();
    console.log(this.email);
    this.OtpForm= this.fb.group({
      otp:['', Validators.required],
    })
  }
 


  verifyOtp() {
    const otp=this.OtpForm.get('otp')?.value;
   const otpData = { email: this.email, otp: otp };
    this.http.post<any>('http://127.0.0.1:8000/otp/', otpData)
      .subscribe(response => {
        console.log('OTP verification successful!');

        this.router.navigate(['/login']);
        this.toastrService.success(
          `Please login`,
          'Correct OTP',
          
        )
      
      }, error => {
        this.OtpForm.reset();
        this.toastrService.error(
          'Incorrect OTP'
          
        );
        //this.router.navigate(['/otp-verify']);
        console.error('OTP verification error:', error);
       
      });
  }
}
