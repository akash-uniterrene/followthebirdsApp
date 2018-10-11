import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CardsPage } from './cards';
import { WhatsOnMindComponent } from '../../components/whats-on-mind/whats-on-mind';

@NgModule({
  declarations: [
    CardsPage,
    WhatsOnMindComponent
  ],
  imports: [
    IonicPageModule.forChild(CardsPage),
    TranslateModule.forChild()
  ],
  exports: [
    CardsPage
  ]
})
export class CardsPageModule { }
