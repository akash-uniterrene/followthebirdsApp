import { Component, Input } from '@angular/core';
import { ModalController, Nav } from 'ionic-angular';

import { User } from '../../providers';
/**
 * Generated class for the WhatsOnMindComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'whats-on-mind',
  templateUrl: 'whats-on-mind.html'
})
export class WhatsOnMindComponent {

 
  text: string;
  userName: string ;
  userPic: string;
  
  constructor(
    private modal: ModalController,
    private nav: Nav,
	public user: User,
  ) {
    console.log('Hello WhatsOnMindComponent Component');
    this.text = 'Hello World';
    this.userPic = this.user.getProfilePic();
    
  }
  updateStatus(){
    const modal = this.modal.create('WhatsOnMindPage',{'handle':'me'});
    modal.present();
  }
  
  
}
