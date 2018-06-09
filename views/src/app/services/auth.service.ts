import {Injectable} from  '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {User} from '../model/user';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import 'rxjs/Rx';




@Injectable()
export class AuthService{
   
    constructor(private http: Http) { }
    user:any;

    signup(user :User){
      const body = JSON.stringify(user);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post('http://localhost:3000/user/signup', user, {headers: headers}).map(res=>res.json);
          
    }

    signin(user :User){
        const body=JSON.stringify(user);
        
        const headers=new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://localhost:3000/user/signin',user,{headers:headers}).map(res=>res.json());
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

}