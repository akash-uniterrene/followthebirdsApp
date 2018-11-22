import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventsProvider } from '../../providers/events/events';
/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
    eventzone: string = "suggested";
	eventLists: any = [];
	eventCategories: any = [];
	private imageURL = "https://dev.followthebirds.com/content/uploads/";
  constructor(public navCtrl: NavController, public events: EventsProvider, public navParams: NavParams) {
	  this.loadEvent('suggested');
  }

  ionViewDidLoad() {
      this.loadEvent('going');
      this.loadEvent('interested');
      this.loadEvent('invited');
      this.loadEvent('manage');
      this.loadEventsCategories();
	  console.log(this.eventLists);
  }

  loadEvent(type){
    this.events.getevents({type: type,id:parseInt(localStorage.getItem('user_id'))})
    .then(data => {
		this.eventLists[type] = data[0];
    });
  }
  
  loadEventsCategories(){
    this.events.geteventCategories()
    .then(data => {
		this.eventCategories = data[0];
    });
  }
  
  viewEvent(eventProfile){
	this.navCtrl.push("EventProfilePage",{eventProfile:eventProfile});
  }
  
  goBack(){
	  this.navCtrl.setRoot("HomePage");
  }
}
