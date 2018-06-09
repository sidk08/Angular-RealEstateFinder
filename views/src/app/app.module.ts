import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule} from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { ApartmentlistComponent } from './apartmentlist/apartmentlist.component';
//import { HttpModule } from '@angular/http/src/http_module';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import{ApartmentlistService} from './services/apartmentlist.service';
import { LogoutComponent } from './logout/logout.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import {AuthService} from './services/auth.service';
import { MainpageComponent } from './mainpage/mainpage.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { AgmCoreModule,MapsAPILoader } from '@agm/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { Component } from '@angular/core/src/metadata/directives';

//import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { FooterComponent } from './footer/footer.component';
import { SellerMainpageComponent } from './seller-mainpage/seller-mainpage.component';
import { ApartmentdetailsComponent } from './apartmentdetails/apartmentdetails.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
//import { MainpageComponent } from './mainpage/mainpage.component';






/**
 * Defining routes
 */

const AUTH_ROUTES = [
 // {path: '', redirectTo: 'user', pathMatch: 'full'},
  { path: 'apartmentlist', component: ApartmentlistComponent },
 //{ path: 'signin', component: SignInFormComponent },
  //{ path: 'logout', component: LogoutComponent }
];

const ROUTES = [
 {
    path: '',
    redirectTo: 'mainpage',
    pathMatch: 'full'
  },
  {
    path: 'mainpage',
    component: MainpageComponent,
  //  children : AUTH_ROUTES

  },
 { 
    path: 'signup', 
    component: SignUpFormComponent
 },
 {
   path:'logout',
   component: LogoutComponent
 },
 {
   path : 'signin',
   component :SignInFormComponent,
  // children : AUTH_ROUTES
 },
{
  path :'apartmentlist',
// redirectTo :'apartmentlist',
  component : ApartmentlistComponent
}
  ,
  {
    path :'createProperty',
    component: CreatePropertyComponent
  },
  {
   path : 'sellerMainPage',
   component : SellerMainpageComponent
  },
  {
    path : 'sellerMainPage',
    component : SellerMainpageComponent
   },
   {
    path: 'apartmentdetails/:id',
    component: ApartmentdetailsComponent
  }
];

 

@NgModule({
  declarations: [
    AppComponent,
    ApartmentlistComponent,

    LogoutComponent,
    SignUpFormComponent,
   
    SignInFormComponent,
    CreatePropertyComponent,
    

    NavigationbarComponent,
    FooterComponent,
    MainpageComponent,
    SellerMainpageComponent,
    ApartmentdetailsComponent,
    EditPropertyComponent,
   

  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,HttpModule,FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCrUHG3HR1jJavrQ7XxKo_VHqq_N6oXlKs",
      libraries: ["places"]
    }),
    HttpClientModule
  ],
  providers: [ApartmentlistService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
