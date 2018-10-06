import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';

import { User } from '../../providers';
import { StorageProvider } from '../../providers/storage/storage';
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
	
	account: { user_name: string, user_password: string } = {
		user_name: '',
		user_password: ''
	};
	public loading;
	// Our translated text strings
	private loginErrorString: string;
	constructor(
		public navCtrl: NavController,
		public user: User,
		public toastCtrl: ToastController,
		public translateService: TranslateService,
		public storage: StorageProvider,
		public loadingCtrl: LoadingController
	)
	{
		this.translateService.get('LOGIN_ERROR').subscribe((value) => {
		  this.loginErrorString = value;
		});

		this.loading = this.loadingCtrl.create({
			content: 'Verifing details...'
		});

		
	}


	

	// Attempt to login in through our User service
	doLogin() {
		this.loading.present();

		this.user.login(this.account).subscribe((resp) => {
			console.log(resp);
			this.loading.dismiss();
			this.storage.setUser(resp);			
		 // this.navCtrl.push(MainPage, resp);
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
