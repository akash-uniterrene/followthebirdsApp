import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams } from 'ionic-angular';
import { FirstRunPage} from '../';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface PageItem {
  title: string
  component: any
}
type PageList = PageItem[]

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public user: any;
  public savedUser : any;
  pages: PageList;
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public nav: Nav 
    ) {    
    this.user = this.navParams.data; 
    
    if(localStorage.getItem('user_firstname') && localStorage.getItem('user_id')){
      this.user.name = localStorage.getItem('user_firstname');
      
    }else{
      this.nav.setRoot(FirstRunPage);
      //this.navCtrl.push(FirstRunPage);
      
    }
  }

  openPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot('TabsPage');
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad HomePage');
  }
  
  getItems() {
	  
  }

}
