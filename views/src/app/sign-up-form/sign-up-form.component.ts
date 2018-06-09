import { Component, OnInit,Input } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { FormGroup, FormControl,Validators } from "@angular/forms";
import { FormsModule }   from '@angular/forms';
import { NgForm,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {User}  from '../model/user';


//import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {


  myForm: FormGroup;
  firstName : String;
  lastName: String;
  email: String;
  password: String;
  userType: String;
  
  constructor(private authService: AuthService,private router: Router) {}

  onSubmit() {
      const user = {
       firstName :this.myForm.value.firstName,
        lastName:this.myForm.value.lastName,
        email:this.myForm.value.email,
        password:this.myForm.value.password,
        userType:this.myForm.value.userType
         
      }
    

      console.log(this.myForm.value.firstName);
      console.log(this.myForm.value);
      this.authService.signup(user)
          .subscribe(
              data => console.log(data),
             error => console.log(error)
          );
this.router.navigate(['signin']);
       
    
 
     
    this.myForm.reset();
    
  
    }
  ngOnInit() {
      this.myForm = new FormGroup({
          firstName: new FormControl(null, Validators.required),
          lastName: new FormControl(null, Validators.required),
          email: new FormControl(null, [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]),
          password: new FormControl(null, Validators.required),
          userType: new FormControl(null, Validators.required)
      });
  }

}