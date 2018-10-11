import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ViewController } from 'ionic-angular';

/**
 * Generated class for the WhatsOnMindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-whats-on-mind',
  templateUrl: 'whats-on-mind.html',
})
export class WhatsOnMindPage {

  public userName: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public nav: NavController,
    public modal: ViewController
    ) {

      if(localStorage.getItem('user_id')){
        this.setUser();        
      }else{
        this.nav.setRoot('LoginPage');
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhatsOnMindPage');
  }

  closeModal(){
    this.modal.dismiss();
  }
  setUser(){    
    this.userName = (localStorage.getItem('user_name'))+' '+(localStorage.getItem('user_lastname'));    
  }

}
