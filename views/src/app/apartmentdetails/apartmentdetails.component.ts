import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ApartmentlistService} from '../services/apartmentlist.service';
import { Apartment } from '../model/apartment';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-apartmentdetails',
  templateUrl: './apartmentdetails.component.html',
  styleUrls: ['./apartmentdetails.component.css']
})
export class ApartmentdetailsComponent implements OnInit {
  closeBtnName: string;
  apartment:Apartment;
  apartmentId:string;
  bed:String;
  slideIndex = 1;
  constructor(private apartmentListService:ApartmentlistService,private route: ActivatedRoute) { } 
  
  ngOnInit() {
   
   this.route.params.subscribe( params =>this.apartmentId =params.id);
   console.log("apId:"+this.apartmentId);
   
   this.apartmentListService.getApartment(this.apartmentId).subscribe(apartment=>this.apartment=apartment);

   
   
  }

  change_focus(event){

    let div = event.target;
    console.log(div.className);
    if(div.className="image1"){
    
    }
  }
  

  setData(){
    this.bed=this.apartment.bed;
    console.log("apartment"+this.apartment);
  }


  goBack() {
    window.history.back()
}
  
  
  plusDivs(n) {
    this.showDivs(this.slideIndex += n);
  }
  
  
  currentDiv(n) {
    this.showDivs(this.slideIndex = n);
  }
  
  showDivs(n) {
    //var x= n.target;
    console.log("showdiv");
    var i;
    var x = document.getElementsByClassName("mySlides")  as HTMLCollectionOf<HTMLElement>;
    var dots = document.getElementsByClassName("demo") as HTMLCollectionOf<HTMLElement>;
    if (n > x.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      console.log(x[i]);
       x[i]['style']['display'] = "none";
    }
   for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" w3-opacity", "");
    }
   // var y = x[(this.slideIndex)-1] as HTMLElement;
  x[this.slideIndex-1]['style']['display']= "block";
  // dots[this.slideIndex-1].className += " w3-opacity";
  }
  

}
