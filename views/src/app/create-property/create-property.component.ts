import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
// import { addListener } from 'cluster';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent implements OnInit {

  private componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

public latitude: number;
public longitude: number;
public searchControl: FormControl;
public zoom: number;

public ip_elem: any;
public preview :any;
@ViewChild("search")
public searchElementRef: ElementRef;


constructor(private mapsAPILoader: MapsAPILoader,
private ngZone: NgZone, private http : HttpClient) { 
}

ngOnInit() {

this.zoom = 4;
this.latitude = 39.8282;
this.longitude = -98.5795;
this.ip_elem = document.querySelector("#multi_img_ip");
this.ip_elem.addEventListener("change", this.updateImageList);

console.log(this.preview);
//create search FormControl
this.searchControl = new FormControl();

//set current position
this.setCurrentPosition();

//load Places Autocomplete
this.mapsAPILoader.load().then(() => {
  let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    types: ["address"]
  });
  autocomplete.addListener("place_changed", () => {
    this.ngZone.run(() => {

      //get the place result
      let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      //verify result
      console.log(place);
      
      var addrflds = document.querySelectorAll("#address-fields input");
      for (var i = 0; i < addrflds.length; i++) {
        addrflds[i]['value'] = "";
        // console.log(addrflds);
      }
      if (place.geometry === undefined || place.geometry === null) {
        return;
      }

      // if(place.types[0] != 'premise'){
      //   return;
      // }


      // for(let ip of addrflds){
      //     ip.value="";
      // }
      // console.log(place);
      //set latitude, longitude and zoom
      this.latitude = place.geometry.location.lat();
      this.longitude = place.geometry.location.lng();
      this.zoom = 17;

      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (this.componentForm[addressType]) {
          var val = place.address_components[i][this.componentForm[addressType]];
          let elem = document.getElementById(addressType);
          elem['value'] = val;
        }
      }
    });
  });
});

// var addImage = document.getElementById("")
}
private setCurrentPosition() {
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.zoom = 12;
  });
}
}

addImage(event){
  this.ip_elem.click();
}

updateImageList(event){
  let input = document.querySelector('#multi_img_ip');
let preview = document.querySelector('.preview');
while(preview.firstChild) {
  preview.removeChild(preview.firstChild);
}

var curFiles = input['files'];
if (curFiles.length > 4) {
  var para = document.createElement('p');
  para.textContent = 'Cannot add more than four images';
  preview.appendChild(para);
  return;
}
if(curFiles.length === 0) {
  var para = document.createElement('p');
  para.textContent = 'No files currently selected for upload';
  preview.appendChild(para);
} else {
  var list = document.createElement('ol');
  preview.appendChild(list);
  for(var i = 0; i < curFiles.length; i++) {
    var listItem = document.createElement('li');
    var para = document.createElement('p');
      para.textContent = 'File name ' + curFiles[i].name ;
     // var image = document.createElement('img');
     // image.src = window.URL.createObjectURL(curFiles[i]);
     // image.setAttribute("style", "width:64px; height:64px");
     // listItem.appendChild(image);
      listItem.appendChild(para);

    list.appendChild(listItem);
  }
}
}

uploadData(event){
let upld_data = new FormData();
console.log(upld_data);
let add_fields = document.querySelectorAll('#address-fields input');
let img_files = document.querySelector('#multi_img_ip');
let prop_fields = document.querySelectorAll('input[type="radio"]');
let addr:string; 
for(let i = 0; i <add_fields.length; i++){
      let ip = add_fields[i];
      // console.log(ip);
      upld_data.set(ip['name'], ip['value']);
}

for(let i = 0; i <prop_fields.length; i++){
  let ip = prop_fields[i];
  
  if(ip['checked']){
    upld_data.append(ip['name'], ip['value']);
  }
  
}
if (img_files['files'].length < 4) {
  alert("select four images");
  return;
}
for(let i=0; i<img_files['files'].length; i++){
  upld_data.append("images", img_files['files'][i], img_files['files'][i]['name']);
}

let use_name = localStorage.getItem('userName');
upld_data.append("email", use_name);

let price=document.getElementById("price");
upld_data.append("price", price['value']);

let sqfeet=document.getElementById("sqfeet");
upld_data.append("sqfeet", sqfeet['value']);

this.http.post('http://localhost:3000/zillow/apartmentlist', upld_data, {
  reportProgress: true,
  observe: 'events'
})
  .subscribe(event => {
    console.log(event); // handle event here
  });
}

}
