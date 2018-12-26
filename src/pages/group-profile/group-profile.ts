import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GroupProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-profile',
  templateUrl: 'group-profile.html',
})
export class GroupProfilePage {
  public groupProfile : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	this.groupProfile = navParams.get('groupProfile');
  }

  ionViewDidLoad() {
    console.log(this.groupProfile);
  }

}
