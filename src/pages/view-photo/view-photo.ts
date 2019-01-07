import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { User } from '../../providers';
import { Post } from '../../providers/post/post';

/**
 * Generated class for the ViewPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-photo',
  templateUrl: 'view-photo.html',
})
export class ViewPhotoPage {
  public photo : any = [];
  private imageURL = "https://dev.followthebirds.com/content/uploads/";
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User, public viewCtrl:ViewController,public modalCtrl: ModalController, public post: Post) {
	  this.photo = this.navParams.get('photo') || [];
  }

  ionViewDidLoad() {
    this.user.getPhoto(parseInt(localStorage.getItem('user_id')),{'photo_id':this.photo.photo_id})
		.then(data => {
		this.photo = data;
	});
  }
  
  getBackgroundStyle(url) {
	if(!url){
		return 'url(assets/followthebirdImgs/no-profile-img.jpeg)'
	} else {
		return 'url(' + this.imageURL+url + ')'
	}
  }

}
