import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ToastrModule } from 'ngx-toastr';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FilterPipe } from './shared/filter.pipe';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { SinglepageComponent } from './components/singlepage/singlepage.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PincodeDialogComponent } from './components/pincode-dialog/pincode-dialog.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { ProductDetComponent } from './components/product-det/product-det.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OtpVerifyComponent } from './components/otp-verify/otp-verify.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetComponent } from './components/reset/reset.component';
import { ReviewformComponent } from './components/reviewform/reviewform.component';
import { FaqComponent } from './components/faq/faq.component';
import { AdminComponent } from './components/admin/admin.component';
import { PostQuestionDialogComponentComponent } from './components/post-question-dialog-component/post-question-dialog-component.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    SignupComponent,
    LoginComponent,
    ProductsComponent,
    FilterPipe,
    ConfirmComponent,
    SinglepageComponent,
    PincodeDialogComponent,
    MainpageComponent,
    ProductDetComponent,
    CartStatusComponent,
    CheckoutComponent,
    OtpVerifyComponent,
    ShippingComponent,
    ForgotpasswordComponent,
    ResetComponent,
    ReviewformComponent,
    FaqComponent,
    AdminComponent,
    PostQuestionDialogComponentComponent,
    UnauthorizedComponent,
    ProductDialogComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgImageSliderModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    CarouselModule,SlickCarouselModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-top-right',
    })
   /* MsalModule.forRoot(new PublicClientApplication(
      {
        auth:{
          clientId:'1eb508c0-a2eb-4112-ab8d-fcf795a7c680',
          redirectUri:'http://localhost:4200',
          authority:'https://login.microsoftonline.com/51973d14-5386-4141-af3c-e75bbfe287fa'
        },
        cache:
        {
          cacheLocation:'localStorage',
          storeAuthStateInCookie:false
        }
      }
    ),
    {
      interactionType:InteractionType.Redirect,
      authRequest:{
        scopes:['user.read']
      }
    },
    {
      interactionType:InteractionType.Redirect,
      protectedResourceMap:new Map(
        [
         [ 'https://graph.microsoft.com/v1.0/me',['user.Read']]
        ]
      )
    }
    ),*/
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[ProductDetComponent]
})
export class AppModule { }
