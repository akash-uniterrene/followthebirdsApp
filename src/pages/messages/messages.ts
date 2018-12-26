import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  messagezone: string = "messages";
  public messages : any = [];
  public groups : any = [];
  private imageURL = "https://dev.followthebirds.com/content/uploads/";
  constructor(public navCtrl: NavController, public user: User, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.user.getMessages({user_id:localStorage.getItem('user_id')}).then(data => {
		let item = data[0];
		for (var key in item) {
			if(item[key].multiple_recipients){
				this.groups.push(item[key]);
			} else {
				this.messages.push(item[key]);
			}
		 
		}		
	});
  }
  
  viewMessage(conversation){
	  this.navCtrl.push('ViewMessagePage', {conversation: conversation});
  }
  
  isToday(data){
	 var date = data.split(' ');
	 
	 var today = new Date();
	 var dd = today.getDate();
	 var mm = today.getMonth()+1; 
	 var yyyy = today.getFullYear();
	 
	 var pDate = date[0].split('-');
	 if(pDate[0] != yyyy ){
		 return false;
	 }else{
		 if(pDate[1] != mm){
			 return false;
			 
		 }else{
			 if(pDate[2] != dd){
				 return false;
			 }else{
				 return true;
			 }
		 }
	 }
	 
  }
  

}
