import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavParams, NavController} from 'ionic-angular';
import { FirstRunPage} from '../';
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
	pendindFriendLists: any = [];
	private imageURL = "https://dev.followthebirds.com/content/uploads/";
	
	isAccept : boolean;
	isDelete : boolean;
	response = 'false';
  constructor(
	public navCtrl: NavController,
	public navParams: NavParams,
	public user: User,
	public nav:Nav
  ) { 
  
  
	}
	ionViewDidLoad() {		
		this.user.getPendingRequest('friend_requests',parseInt(localStorage.getItem('user_id')))
		.then(data => {
			this.pendindFriendLists = data[0];
		});
		console.log(this.pendindFriendLists.length);
	}
		
	confrimRequest(event,user_id) {
		console.log(event.target.parentNode);
		event.target.parentNode.parentNode.parentNode.innerText = "You are now Friends";
		//event.target.parentNode.parentNode.parentNode.classList.add('accept_request');
		this.connectAction("friend-accept",user_id);
	}

	deleteRequest(event,user_id) {
		event.target.parentNode.parentNode.parentNode.innerText = "Friend Request Removed";
		this.connectAction("friend-decline",user_id);
	}	
	
	viewProfile(user_name,user_id) {
		this.nav.setRoot('ProfilePage', {user_name: user_name,user_id:user_id});
	} 
	
	connectAction(type,user_id){
		let params :any = {
			'do': type,
			'id': user_id,
			'my_id' : localStorage.getItem('user_id')
		};
		this.user.connection(params).subscribe((resp) => {						
			
		}, (err) => {
		
		});
	}
}
