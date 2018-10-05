import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
	
	/*
	account: { first_name: string, last_name: string, username: string, email: string, password: string } = {
		first_name: 'John',
		last_name: 'Doe',
		username: 'johndoe',
		email: 'test@example.com',
		password: 'test'
	};
	*/
	account: { user_name: string, user_password: string } = {
		user_name: '',
		user_password: ''
	};
	// Our translated text strings
	private signupErrorString: string;
	constructor(
		public navCtrl: NavController,
		public user: User,
		public toastCtrl: ToastController,
		public translateService: TranslateService
	)
	{
		this.translateService.get('LOGIN_ERROR').subscribe((value) => {
		  this.loginErrorString = value;
		})
	}

	// Attempt to login in through our User service
	doLogin() {
		this.user.login(this.account).subscribe((resp) => {
		  this.navCtrl.push(MainPage);
		}, (err) => {
		  // Unable to log in
		  let toast = this.toastCtrl.create({
			message: this.loginErrorString,
			duration: 3000,
			position: 'top'
		  });
		  toast.present();
		});
	}
  
	signup() {
		this.navCtrl.push('SignupPage');
	}

 
}
