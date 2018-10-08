import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';


/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  account: { user_email: string } = {
		user_email: '',
	};

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  sendUserAuth(){

    if(this.account){
      var datas = {
        email: 'ranit@uniterrene.com',
        code: 'RAM1'
      }
      this.nav.push('OtpPage', datas)
    }
  }
  signup(){
    this.nav.push('SignupPage')
  }
  login(){
    this.nav.push('WelcomePage')
  }

}
