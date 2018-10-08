import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {

  account: { user_email: string } = {
		user_email: '',
  };
  userData : { email: string, code: string } = { email: '', code: '' };
  code1 : string;
  code2 : string;
  code3 : string;
  code4 : string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public nav: Nav
    ) {
   
    this.userData.email = this.navParams.data.email;
    this.userData.code = this.navParams.data.code;
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }

  signup(){
    this.nav.push('SignupPage')
  }
  login(){
    this.nav.push('WelcomePage')
  }
  resendOTP( email: string){
    console.log(email);
  }

}
