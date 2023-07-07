import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/helpers/Validationform';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { OtpserviceService } from 'src/app/services/otpservice.service';
import { ToastrService } from 'ngx-toastr';
import { SignupserviceService } from 'src/app/services/signupservice.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"
  constructor(private fb : FormBuilder,private auth:AuthService, private router: Router,private http:HttpClient, private otpService: OtpserviceService,private toastr:ToastrService,private SignUpService:SignupserviceService) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      userName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
  }


  OnSubmit(): void {
    if (this.signUpForm.valid) {
      const payload = {
        first_name: this.signUpForm.get('firstName')?.value,
        last_name: this.signUpForm.get('lastName')?.value,
        username: this.signUpForm.get('userName')?.value,
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value
      };

      this.http.post<any>('http://127.0.0.1:8000/signup/', payload).subscribe(
        response => {
          this.SignUpService.setEmail(this.signUpForm.get('email')?.value);
          this.signUpForm.reset();
          this.router.navigate(['/otp-verify']);
          this.toastr.success(response.message, 'Success');
          
         // alert("Registration successful");
          console.log(response.message);
        },
        error => {
          console.error(error);
          this.toastr.error('An error occurred. Please try again.', 'Error');
        }
      );
    } else {
      // Handle form validation errors
      this.signUpForm.markAllAsTouched();
    }
  }


}
