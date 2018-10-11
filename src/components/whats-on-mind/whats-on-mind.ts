import { Component, Input } from '@angular/core';
import { ModalController, Nav } from 'ionic-angular';


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

  constructor(
    private modal: ModalController,
    private nav: Nav
  ) {
    console.log('Hello WhatsOnMindComponent Component');
    this.text = 'Hello World';
    
    
  }
  updateStatus(){
    const modal = this.modal.create('WhatsOnMindPage');
    modal.present()
  }
  
}
