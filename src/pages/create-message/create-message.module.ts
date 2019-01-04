import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateMessagePage } from './create-message';
import {IonTagsInputModule} from "@angular/ionic-tags-input";
@NgModule({
  declarations: [
    CreateMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateMessagePage),
	IonTagsInputModule
  ],
})
export class CreateMessagePageModule {}
