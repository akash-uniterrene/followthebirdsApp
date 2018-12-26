import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
/**
 * Generated class for the ViewMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-message',
  templateUrl: 'view-message.html',
})
export class ViewMessagePage {
  private conversation : any = [];
  private messages : any = [];
  private imageURL = "https://dev.followthebirds.com/content/uploads/";
  
  private myId = localStorage.getItem('user_id');
  
  public message = '';
  
  constructor(public navCtrl: NavController, public user: User, public navParams: NavParams) {
	  this.conversation = navParams.get('conversation');
  }

  ionViewDidLoad() {
    this.user.viewMessage({user_id:localStorage.getItem('user_id'),conversation_id:this.conversation.conversation_id}).then(data => {
		this.messages = data;	
	});
  }
  
  sendMessage(){
	this.user.postMessage({conversation_id:this.conversation.conversation_id,message:this.message}).subscribe((resp) => {						
			
	}, (err) => {
		
	});
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
  
  
  goBack(){
	  this.navCtrl.pop();
  }
}
