import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

/**
 * Generated class for the GeneralInfoSlidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-general-info-slide',
  templateUrl: 'general-info-slide.html',
})
export class GeneralInfoSlidePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralInfoSlidePage');
  }
  intro(status: string){
    if(status == 'done'){
      localStorage.setItem('user_intro', 'true');
      this.nav.setRoot('HomePage');
    }
  }

}
