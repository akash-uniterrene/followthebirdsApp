import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { WhatsOnMindComponent } from '../../components/whats-on-mind/whats-on-mind';
@NgModule({
  declarations: [
    ProfilePage,
    WhatsOnMindComponent
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
  ],
})
export class ProfilePageModule {}
