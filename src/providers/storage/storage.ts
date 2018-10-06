import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient) {
    
  }

  getUser(id:number){
   
  }

  
  setUser(user : any){
    console.log(user);
    for (var key in user) {
      if (user.hasOwnProperty(key)) {          
          localStorage.setItem(key,user[key])
      }
    }
  }

}
