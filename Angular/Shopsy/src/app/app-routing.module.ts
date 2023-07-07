import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { SinglepageComponent } from './components/singlepage/singlepage.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { ProductDetComponent } from './components/product-det/product-det.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OtpVerifyComponent } from './components/otp-verify/otp-verify.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetComponent } from './components/reset/reset.component';
import { FaqComponent } from './components/faq/faq.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
const routes: Routes = [
  {path:'',component:ProductsComponent},
  {path:'product',component:ProductsComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'cart',component:CartComponent},
  {path:'single',component:SinglepageComponent},
  {path:'main',component:MainpageComponent},
  {path:'detail/:productid',component:ProductDetComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'otp-verify',component:OtpVerifyComponent},
  {path:'ship',component:ShippingComponent},
  {path:'forgotpassword/:token',component:ForgotpasswordComponent},
  {path:'reset',component:ResetComponent},
  {path:'faq',component:FaqComponent},
  {path:'admin',component:AdminComponent},
  {path:'unauthorized',component:UnauthorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
