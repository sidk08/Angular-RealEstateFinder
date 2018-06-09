import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {User}  from '../model/user';
import {AuthService} from '../services/auth.service';
//import {Apartmentlist} from '../apartmentlist/apartmentlist.component';


@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  myForm :FormGroup;
  //email: String;
  //password :String;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(){
    
    console.log(this.myForm.value.email);

    const user = {email:this.myForm.value.email, password: this.myForm.value.password};
    this.authService.signin(user)
    .subscribe(
      data => {
       
        localStorage.setItem('token',data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userType',data.userType);
        localStorage.setItem('userName',data.email);
       // this.router.navigate(['apartmentlist']);
       localStorage.removeItem('type');
       localStorage.removeItem('bath');
       localStorage.removeItem('bed');
       localStorage.removeItem('price_max');
       localStorage.removeItem('price_min');
     
      //this.storeInLocalStorage(this.selectedEntry_hometype,this.selectedEntry_bath,this.selectedEntry_beds,this.selectedEntry_maxprice.toString(),this.selectedEntry_minprice.toString(),this.sqfeet_min,this.sqfeet_max,this.location_value) localStorage.removeItem('sqfeetmax');
       localStorage.removeItem('counter');
       localStorage.removeItem('location');
       console.log("counter logout"+localStorage.getItem('counter'));

       if(data.userType=='seller'){

            this.router.navigate(['sellerMainPage']);
       }
       else
       this.router.navigate(['apartmentlist']);
       
    },
 
    

    error => console.error(error)
);
    this.myForm.reset();
  }

  ngOnInit() {
  
    this.myForm = new FormGroup({
      email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
  });
  }

}
