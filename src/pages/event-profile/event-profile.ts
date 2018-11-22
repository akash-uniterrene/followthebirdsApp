import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-profile',
  templateUrl: 'event-profile.html',
})
export class EventProfilePage {
  public eventProfile : any = {
    event_admin: "54",
	event_album_covers: "23",
	event_album_timeline: null,
	event_category: "17",
	event_cover: "photos/2018/11/sngine_7904c0151234218cca024da5574d72f2.jpg",
	event_cover_id: "124",
	event_date: "2018-11-21 10:02:59",
	event_description: "Happiness radiates like the fragrance from a flower and draws all good things towards you. &lt;3",
	event_end_date: "2018-11-23 15:32:00",
	event_going: "0",
	event_id: "3",
	event_interested: "1",
	event_invited: "0",
	event_location: "Keshtopur",
	event_picture: "/photos/2018/11/sngine_7904c0151234218cca024da5574d72f2.jpg",
	event_pinned_post: null,
	event_privacy: "public",
	event_start_date: "2018-11-21 15:32:00",
	event_title: "Fly High",
	i_joined: false
  };
  
  private myId : number = parseInt(localStorage.getItem('user_id'));
  private imageURL = "https://dev.followthebirds.com/content/uploads/";	
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  //	this.eventProfile = navParams.get('eventProfile');
  }

  ionViewDidLoad() {
    console.log(this.eventProfile);
  }
  
  getCoverBackgroundStyle() {
	if(!this.eventProfile.event_cover){
		return 'url(assets/followthebirdImgs/coover_dummy.png)'
	} else {
		return 'url(' + this.imageURL+this.eventProfile.event_cover + ')'
	}
  }

}
