import { Component, OnInit } from '@angular/core';
import {ApartmentlistService} from '../services/apartmentlist.service';
import * as d3 from 'd3';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seller-mainpage',
  templateUrl: './seller-mainpage.component.html',
  styleUrls: ['./seller-mainpage.component.css']
})
export class SellerMainpageComponent implements OnInit {

  apartments=[];
  constructor(private apartmentListService:ApartmentlistService,private router: Router) { }

  ngOnInit() {

    var userName=localStorage.getItem('userName');
    console.log('inside the  page ' +userName);

    this.apartmentListService.getApartmentListByUserName(userName).subscribe(apartments=>this.apartments=apartments);
      console.log(this.apartments);
   
   
  }
     
  deleteApartment(id){

    this.apartmentListService.deleteApartmentById(id).subscribe(apartments=>this.apartments=apartments);
    alert('Apartment has been deleted from the site');

   }

   toCreateProperty(){
      
    this.router.navigate(['createProperty']);

  }


}
