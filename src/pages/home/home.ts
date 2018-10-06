import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage , FirstRunPage} from '../';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public user: any;
  public savedUser : any;
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,   
    ) {    
    this.user = this.navParams.data; 
    
    if(localStorage.getItem('user_firstname') && localStorage.getItem('user_id')){
      this.user.name = localStorage.getItem('user_firstname');
      
    }else{
      this.navCtrl.push(FirstRunPage);
      
    }
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad HomePage');
  }
  
  getItems() {
	  
  }

}
