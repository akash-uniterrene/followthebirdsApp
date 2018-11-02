import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams,  ToastController, MenuController } from 'ionic-angular';
import { FirstRunPage} from '../';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { User } from '../../providers';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	profileId : number;
	profile : any;
	constructor(
		public navCtrl: NavController, 
		public user: User,
		public storage: StorageProvider,
		public toastCtrl: ToastController,
		public navParams: NavParams,  
		private camera: Camera,
		public menu: MenuController,
		public nav: Nav 
    ) {
	//this.profile = navParams.get('profilePageParams');
	this.profileId = parseInt(localStorage.getItem('user_id'));
	this.getProfileData(this.profileId);
  }
	
	getProfileData(id){
		this.user.getProfile(id).then(data => {
			this.profile = data;
		});
	}
}
