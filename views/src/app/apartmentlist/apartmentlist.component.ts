import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'angular-2-dropdown/mk-dropdown/dropdown.module';
import {ApartmentlistService} from '../services/apartmentlist.service';
import {Apartment} from '../model/apartment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ApartmentdetailsComponent} from '../apartmentdetails/apartmentdetails.component';

import { Router } from '@angular/router';
import { DomSanitizer  } from '@angular/platform-browser';
 

@Component({
  selector: 'app-apartmentlist',
  templateUrl: './apartmentlist.component.html',
  styleUrls: ['./apartmentlist.component.css'],
  providers:[ApartmentlistService]
})
export class ApartmentlistComponent implements OnInit {

  
  apartments:Apartment[]=[];
  apartment: Apartment;
  user_name:String;
  price:Number;
  bed:String;
  bath:String;
  type:String;
  imgsrc:String;
  zip:String;
  address:String;
  filteredApartments:Apartment[]=[];
  checkedList_hometype=[];
  FilteredApartment = [];
  //selectedEntry_beds;
  //selectedEntry_hometype;
  selectedEntry_beds:String=null;
  selectedEntry_hometype:String=null;
  selectedEntry_minprice:Number;
  selectedEntry_maxprice:Number;
  selectedEntry_bath:String=null;
  location_value:String='';
  //sqfeet_min:Number=null;
  //sqfeet_max:Number=null;
  selected_sort:String;
  firstload:number=0;
  bedlist = [
    {id:0,value:null},
    { id: 1,value: '1 BHK' },
    { id: 2,value: '2 BHK' },
    { id: 3,value: '3 BHK'},
    { id: 4,value: '4 BHK'},
    {id: 5,value: '5 BHK & ABOVE'} ];
  hometype = [
    {id:0,value:null},
    { id: 1,value: 'HOUSES'},
    { id: 2,value: 'APARTMENTS' },
    { id: 3,value: 'CONDOS'},
    { id: 4,value: 'TOWNHOMES'}];
 
  filter={
    bed:String,
    house:[]

  }
  price_min= [
    {id: 1, value: '0' },
    {id: 2, value: '50000' },
    {id: 3, value: '100000' },
    {id: 4, value: '200000'},
    {id: 5, value: '300000'},
    {id: 6, value: '400000'},
    {id: 7, value: '500000'}
  ];
  price_max= [
    
    {id: 1, value: '50000' },
    {id: 2, value: '100000' },
    {id: 2, value: '200000'},
    {id: 4, value: '300000'},
    {id: 5, value: '400000'},
    {id: 6, value: '500000'},
    {id: 5, value: '900000'}
  ];
  bathlist= [
    {id:0,value:null},
    {id: 1, value: '0' },
    {id: 2, value: '1' },
    {id: 3, value: '2' },
    {id: 4, value: '3'},
    {id: 5, value: '4'},
    {id: 6, value: '5'},
    {id: 7, value: '5+'}
  ];
  sortlist= [
    {id: 1, value: 'Low-High' },
    {id: 2, value: 'High-Low' },
    
  ];
  photo:String='images/1.jpg';
  //for filtr
  /*private options = {
   
    user_name:  'seha',
    bed:   '1 BHK',
  
  };*/
  result;
  constructor(private apartmentListService:ApartmentlistService, private router: Router,private sanitizer: DomSanitizer) { } //private modalService: NgbModal,

  ngOnInit() {

    //this.apartmentListService.getApartmentlist().subscribe(apartments=>this.apartments=apartments);
    //this.apartmentListService.getApartment('5ad06a8d39b5c5c3598d9226').subscribe(apartment=>this.apartment=apartment);
   // localStorage.removeItem('counter');
   this.selectedEntry_minprice=0;
   this.selectedEntry_maxprice=50000;
   
   this.firstload=Number(localStorage.getItem('counter'));
  
    if(this.firstload>0){
      
      this.selectedEntry_bath = localStorage.getItem('bath');
      this.selectedEntry_hometype = localStorage.getItem('type');
      this.selectedEntry_beds =localStorage.getItem('bed');
      this.selectedEntry_maxprice=Number(localStorage.getItem('price_max'));
      this.selectedEntry_minprice=Number(localStorage.getItem('price_min'));
      this.location_value=localStorage.getItem('location');
      this.filterProperties();
  


    }else{
      console.log("else");
     
      this.selectedEntry_bath = null;
      this.selectedEntry_hometype = null;
      this.selectedEntry_beds =null;
      this.selectedEntry_maxprice=50000;
      this.selectedEntry_minprice=0;
      this.location_value='';
      this.firstload++;
      console.log(this.firstload+"after ++");

    }
    
    
  }

  queryParams;
  
 filterProperties(data = ''){
  
   
    data = '?';
     (this.selectedEntry_hometype != 'null' && this.selectedEntry_hometype != 'undefined' && this.selectedEntry_hometype != null)? data += 'type=' + this.selectedEntry_hometype + '&':'';
     (this.selectedEntry_bath != 'null' && this.selectedEntry_bath != 'undefined' && this.selectedEntry_bath != null)?  data += 'bath=' + this.selectedEntry_bath +'&':'';
     (this.selectedEntry_beds != 'null' && this.selectedEntry_beds != 'undefined' && this.selectedEntry_beds != null)? data += 'bed=' + this.selectedEntry_beds+'&':'';
   
    (this.selectedEntry_maxprice != null && this.selectedEntry_minprice != null)? data += 'price=' + this.selectedEntry_maxprice+','+this.selectedEntry_minprice+'&':'';
   // (this.sqfeet_min != null && this.sqfeet_max != null && this.sqfeet_max != 0 && this.sqfeet_min != 0)? data += 'sqfeet=' + this.sqfeet_max+','+this.sqfeet_min+'&':'';
    (this.location_value != null && this.location_value != 'null' && this.location_value != 'undefined' && this.location_value != '')? data += 'address=' + this.location_value:'';


    console.log(data);
    this.apartmentListService.filterProperties(data)
      .subscribe(result => {
         console.log(result);
        
        if(result != null){
        this.filteredApartments=result;
        }
      });
      console.log(this.filteredApartments)
      
  }

  getdata(name:any,name1:any,bath:any){  
    this.filteredApartments.length=0;
    
    this.apartmentListService.getApartmentlist().subscribe(apartments=>this.apartments=apartments);
    
    for(var i=0;i<this.apartments.length;i++){
    if(this.apartments[i].bed==name1 || this.apartments[i].type==name || this.apartments[i].bath==bath ){ 
        console.log(this.apartments[i].user_name);
       this.filteredApartments.push(this.apartments[i]);

    }

    }
  }
  
  getDataById(id:any){

    this.apartmentListService.getApartment(id).subscribe(apartment=>this.apartment=apartment);
    console.log(this.apartment);
  }

  goToDetailPage(clickedAlbum) {
    this.router.navigate(['apartmentdetails', clickedAlbum]);
    this.storeInLocalStorage(this.selectedEntry_hometype,this.selectedEntry_bath,this.selectedEntry_beds,this.selectedEntry_maxprice.toString(),this.selectedEntry_minprice.toString(),this.location_value,this.firstload.toString());
    this.firstload++;
  };

  storeInLocalStorage(hometype,bath,bed,pricemax,pricemin,location,counter){

  
    localStorage.setItem('type',hometype);
    localStorage.setItem('bath',bath);
    localStorage.setItem('bed',bed);
    
    localStorage.setItem('price_max',pricemax);
    localStorage.setItem('price_min',pricemin);

    localStorage.setItem('location',location);
    localStorage.setItem('counter',counter);
    

  }

  
  onCheckboxChange(option, event) {
    if(event.target.checked) {
    
     this.filter.house.push(option.value);
    } else {
      for(var i=0 ; i < this.hometype.length; i++) {
       
        if(this.filter.house[i] == option.value){
         
          this.filter.house.splice(i,1);
        }
      }
    }
    console.log(this.filter.house);
    } 

   

   /* onSelectionChange(entry) {
       // this.selectedEntry_beds = entry;
       this.selectedEntry_beds = entry.value;
       // this.filter.bed=entry.value;
        //console.log(this.selectedEntry_beds.value);
        console.log(this.selectedEntry_beds);
    }*/

   /* onSelectionChange_hometype(entry) {
      //this.selectedEntry_beds = entry;
      this.selectedEntry_hometype = entry.value;
     // this.filter.bed=entry.value;
      //console.log(this.selectedEntry_beds.value);
      console.log(this.selectedEntry_hometype);
     }*/

     onSelectionChange_pricemin(val:any) {

      this.selectedEntry_minprice=val;
      console.log(this.selectedEntry_minprice);

     }
     onSelectionChange_pricemax(maxval:any) {

      this.selectedEntry_maxprice=maxval;
      console.log(this.selectedEntry_maxprice);

     }
     onSelectionChange_bath(bath:any) {

      this.selectedEntry_bath=bath;
      console.log(this.selectedEntry_bath);

     }
     onSelectionChange_bed(bed:any) {

      this.selectedEntry_beds=bed;
      console.log(this.selectedEntry_beds);

     }
     onSelectionChange_hometype(type:any){

      this.selectedEntry_hometype=type;
      console.log(this.selectedEntry_hometype);
     }

     onKey(event) {
      if(event.target.value != '' || event.target.value != null){
      this.location_value=event.target.value;
      console.log(this.location_value);
      }else{
        this.location_value=null;
      }
     }

     

     getStyle() {
      // snip snip -> fetch the url from somewhere
      const profilePicUrl = 'images/house_header.jpg';
      const style = `background-image: url(${profilePicUrl})`;
  
      // sanitize the style expression
      return this.sanitizer.bypassSecurityTrustStyle(style);
    }
     

     

    /*sort function*/

    onSelectionChange_sort(value:any){

      this.selected_sort = value;
      console.log(this.selected_sort);
    }
    onSort(){
     // if((<HTMLInputElement>document.getElementById("sort")).value=="Price | Low-High") {
      //this.apartmentListService.getApartmentlist().subscribe(apartments=>this.apartments=apartments);
      if(this.selected_sort==="Low-High") {
        this.priceAsc();
        console.log(this.filteredApartments);
      }
      else if(this.selected_sort==="High-Low"){
        this.priceDesc();
        console.log(this.filteredApartments);
      }
    }
    priceDesc(){
      this.filteredApartments.sort(function(a:Apartment,b:Apartment){
        console.log("in desc");
        if(a.price > b.price){
          return -1;
        }
        if(a.price < b.price){
          return 1;
        }
        return 0;
      });
    }
  
    priceAsc(){
      this.filteredApartments.sort(function(a:Apartment,b:Apartment){
        console.log("in asc");
        if(a.price < b.price){
          return -1;
        }
        if(a.price > b.price){
          return 1;
        }
        return 0;
      });
    }
  
    
}
