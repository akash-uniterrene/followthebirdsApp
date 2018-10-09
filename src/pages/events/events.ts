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

	eventLists: any;
  constructor(public navCtrl: NavController, public events: EventsProvider, public navParams: NavParams) {
	  this.loadEvent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  loadEvent(){
    this.events.getevents({suggested: true})
    .then(data => {
		this.eventLists = data[0];
    });
  }
}
