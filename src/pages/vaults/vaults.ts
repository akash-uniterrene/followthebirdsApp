import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { User } from '../../providers';
/**
 * Generated class for the VaultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vaults',
  templateUrl: 'vaults.html',
})
export class VaultsPage {
  
  public vaults = [];
	constructor(public navCtrl: NavController, public user: User, public navParams: NavParams, public modalCtrl: ModalController) {	  
  }

  ionViewDidLoad() {
	this.user.getVaultStorage({my_id:localStorage.getItem('user_id')})
		.then(data => {
			let item = data[0];
			for (var key in item) {
			  this.vaults.push(item[key]);
			}
	});
	console.log(this.vaults);
  }
  
  goBack(){
	this.navCtrl.setRoot("HomePage");
  }
  
  createVault(){
	const modal = this.modalCtrl.create('VaultCreatePage');
    modal.present();
  }
  
  viewVault(vault){
	this.navCtrl.push('ViewVaultPage', {vault:vault});
  }

}
