import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../providers';

/**
 * Generated class for the FriendRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-requests',
  templateUrl: 'friend-requests.html',
})
export class FriendRequestsPage {
	pendindFriendLists: any;
	private imageURL = "https://dev.followthebirds.com/content/uploads/";
	
	isAccept : boolean;
	isDelete : boolean;
	response = 'false';
  constructor(
	public navCtrl: NavController,
	public navParams: NavParams,
	public user: User
  ) { 
  
  
	}
	ionViewDidLoad() {		
		this.user.getPendingRequest('friend_requests',parseInt(localStorage.getItem('user_id')))
		.then(data => {
			this.pendindFriendLists = data[0];
		});
	}
		
	confrimRequest() {
		this.isAccept = true;
		this.response = 'true';
	}

	deleteRequest() {
		this.isDelete = true;
		this.response = 'true';
	}	
	
	viewProfile(user_name) {
		this.navCtrl.setRoot('ProfilePage', {user_name: user_name});
	}
}
