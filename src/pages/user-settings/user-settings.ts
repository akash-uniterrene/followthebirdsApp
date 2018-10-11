import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController, LoadingController   } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the UserSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-settings',
  templateUrl: 'user-settings.html',
})
export class UserSettingsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl : AlertController,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    public nav: Nav) {
  }
  

  getPicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSettingsPage');
  }
  logouta(){
    localStorage.clear();
    this.nav.setRoot('LoginPage')
  }
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Logging out...",
      duration: 1000
    });
    loader.present();

    loader.onDidDismiss(() => {
      localStorage.clear();
       this.nav.setRoot('WelcomePage')
      console.log('Dismissed loading');
    });
  }

  logout() {
    const confirm = this.alertCtrl.create({
      title: 'Logout?',
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            console.log('Agree clicked');
            this.presentLoading();
            
          }
        }
      ]
    });
    confirm.present();
  }

}
