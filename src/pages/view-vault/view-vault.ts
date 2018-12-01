import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
/**
 * Generated class for the ViewVaultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-vault',
  templateUrl: 'view-vault.html',
})
export class ViewVaultPage {
	
   public vault :any = [];
   private imageURL = "https://dev.followthebirds.com/content/uploads/";
   public files = [];
   public type = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User) {
	this.vault = navParams.get('vault');
  }

  ionViewDidLoad() {
	this.user.viewVault({folder_name:this.vault.folder_name,my_id:localStorage.getItem('user_id')}).then(data => {
		this.type = data[0].type;
		this.files = data[0].files;
		console.log(this.files);
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
