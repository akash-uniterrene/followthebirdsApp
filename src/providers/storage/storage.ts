import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  private profilePicURL = "https://dev.followthebirds.com/content/uploads/";
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

  // profie Picutre module

  checkprofilePic( picure: any ){
    return true; // if previously stored image and current image is same;
  }

  getProfilePic(){
    if(localStorage.getItem('user_picture') != ''){
      let userPic = localStorage.getItem('user_picture');
      let FullPath = this.profilePicURL + userPic;
      console.log('prifile Pic url:'+FullPath);
    }
    
  }

  




}
