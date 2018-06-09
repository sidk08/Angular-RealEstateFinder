import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Apartment} from '../model/apartment';
import 'rxjs/add/operator/map';



@Injectable()
export class ApartmentlistService {


  constructor(private http: Http) { }

         //getting apartmentservice

         getApartmentlist(){

              return this.http.get('http://localhost:3000/zillow/apartmentlist').map(res=>res.json());
         }



        //  getApartmentListByUserName(username){
        //    return this.http.get('http://localhost:3000/zillow/apartmentlist/'+username).map(res=>res.json());
        //  }


         getApartment(_id:string){

          return this.http.get('http://localhost:3000/zillow/apartmentlist1/'+_id).map(res=>res.json());
     }

     filterProperties(param = ''){
      return this.http.get('http://localhost:3000/zillow/apartmentfilter' + param ).map(res=>res.json());
    }
   /*  getAllItems(query: any) {
      let params: URLSearchParams = new URLSearchParams();
      for(let key in query){
        params.set(key.toString(), query[key]);
      }
      this.options.search = params;
      //this.header = this.headers();
      return this.http.get('http://localhost:3000/zillow/apartmentlist/', this.options)
      .map((res: Response) => res.json() as MyObject[])
      .catch(this.handleError);*/
 getApartmentListByUserName(username){
           console.log('the username in service'+username);
           return this.http.get('http://localhost:3000/zillow/apartmentlist/'+username).map(res=>res.json());
           
         }

         deleteApartmentById(_id:string){
          return this.http.delete('http://localhost:3000/zillow/apartmentlist/'+_id).map(res=>res.json());
         }



         
}
