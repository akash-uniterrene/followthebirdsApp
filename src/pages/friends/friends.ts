import { Component } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';

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
	private profile_id : number;
	friendLists: any;
	friendzone: string = "suggested";
	pendindFriendLists: any;
	getSuggestedUsers: any = [];
	constructor(public navCtrl: NavController, public user: User, public navParams: NavParams, nav:Nav ) {
	  this.profile_id = navParams.get('user_id') || localStorage.getItem('user_id');
	}

  ionViewDidLoad() {
	this.user.getfriends(this.profile_id)
	.then(data => {
		this.friendLists = data[0];
	});
	
	this.user.getPendingRequest('friend_requests',parseInt(localStorage.getItem('user_id')))
	.then(data => {
		this.pendindFriendLists = data[0];
	});
	
	this.user.getSuggestedUser('all',parseInt(localStorage.getItem('user_id')))
	.then(data => {
		this.getSuggestedUsers = data[0];
	});
	
	
  }

  viewProfile(user_name,user_id) {
		this.navCtrl.setRoot('ProfilePage', {user_name: user_name,user_id:user_id});
  } 
  
  goBack(){
	  this.navCtrl.setRoot("HomePage");
  }
}
