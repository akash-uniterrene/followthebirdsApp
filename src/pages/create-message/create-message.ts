import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
/**
 * Generated class for the CreateMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-message',
  templateUrl: 'create-message.html',
})
export class CreateMessagePage {
  items;
  private imageURL = "https://dev.followthebirds.com/content/uploads/";

  constructor(public navCtrl: NavController,  public user: User, public navParams: NavParams) {
	
	this.user.getfriends(parseInt(localStorage.getItem('user_id')))
	.then(data => {
		this.items = data[0];
	});
	this.initializeItems();
  }

  initializeItems() {
    return this.items;
  }
  
  viewMessage(item){
	 console.log(item)
	 let conversation = {
			name:item.user_firstname+' '+item.user_lastname,
			picture:item.user_picture
	 }
	 this.navCtrl.push('ViewMessagePage', {conversation: conversation});
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();
	
	console.log(this.items);
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.user_firstname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
	
}
