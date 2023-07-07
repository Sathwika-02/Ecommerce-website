import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import ValidateForm from 'src/helpers/Validationform';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public loginForm!: FormGroup;
  allUsers: any;
  isLoggedIn : boolean = false;
  loggedInUserName: any;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http:HttpClient,
    private apiservice:ApiService,
    private toastrService:ToastrService,

   
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

onSubmit(): void {
  if (this.loginForm.valid) {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.apiservice.setLogUser(username);
    
    if (username === 'admin' && password === 'admin') {
      // Successful login as admin
      this.loginForm.reset();
      this.router.navigateByUrl('/admin');
      this.toastrService.success('Admin Login Successful');
      LoginService.setLoginStatus(true);
      LoginService.setUsername(username);
      LoginService.setIsAdmin(true);
    } 
    else{
    const body = {
      username: username,
      password: password
    };

    this.http.post<any>('http://127.0.0.1:8000/login/', body).subscribe(
      response => {
  
         this.loginForm.reset();
        
        
        //localStorage.setItem('token', response.token)
        this.router.navigateByUrl('/main');
        this.toastrService.success(
          'Login Successful'
        )
        LoginService.setLoginStatus(true);
        LoginService.setUsername(username);
        // Handle successful login
        console.log(response);
        //alert("Login successful");
      },
      error => {
        this.toastrService.error("Some thing went wrong")
        // Handle login error
        console.error(error);
        alert("Invalid credentials");
      }
    );
  }
 } else {
    // Handle form validation errors
    this.loginForm.markAllAsTouched();
  }
}
}

