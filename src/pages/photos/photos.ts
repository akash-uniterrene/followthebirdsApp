import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the PhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {
  @ViewChild('slider') slider: Slides;
  page="0";
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosPage');
  }
  
  goBack(){
	  this.navCtrl.setRoot("HomePage");
  }
  
  selectedTab(ind){
    this.slider.slideTo(ind);
  }


  moveButton($event) {
    this.page = $event._snapIndex.toString();
  }
  
}
