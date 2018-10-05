import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../providers';
/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

	public friendLists = [];
	constructor(public navCtrl: NavController, public user: User, public navParams: NavParams) {
	  
	}

  ionViewDidLoad() {
	console.log(this.user.getfriends({id: 41}));
  }

}
