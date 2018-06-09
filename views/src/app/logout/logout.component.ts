import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService:AuthService,private router : Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['mainpage']);
  }

}

