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
		
	confrimRequest(item) {
		this.isAccept = true;
		this.response = 'true';
		this.connectAction(item,'friend-accept');
	}

	deleteRequest(item) {
		this.isDelete = true;
		this.response = 'true';
		this.connectAction(item,'friend-decline');
	}	
	
	viewProfile(user_name,user_id) {
		this.nav.setRoot('ProfilePage', {user_name: user_name,user_id:user_id});
	} 
	connectAction(item,type){
		console.log(item);
		let params :any = {
			'do': type,
			'id': item.user_id,
			'my_id' : localStorage.getItem('user_id')
		};
		this.user.connection(params).subscribe((resp) => {						
			
		}, (err) => {
		
		});
	}
}
