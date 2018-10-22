import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, MenuController } from 'ionic-angular';
import { FirstRunPage} from '../';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface PageItem {
  title: string
  component: any
}
type PageList = PageItem[]

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public user: any;
  public savedUser : any;
  pages: PageList;

  introduction = 'CardsPage';  
  settingsPage = 'UserSettingsPage';
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    private camera: Camera,
    public menu: MenuController,
    public nav: Nav 
    ) {

     // localStorage.setItem('user_intro', 'false');
    
		this.menu.enable(false); 
		  
		this.user = this.navParams.data; 
		
		if(localStorage.getItem('user_firstname') && localStorage.getItem('user_id')){
		  //this.user.name = localStorage.getItem('user_firstname');
		  console.log(localStorage.getItem('user_picture'));
		  if(this.user.user_picture_id <= 0){
			 this.nav.setRoot('GeneralInfoSlidePage');
		  }
		}else{
		  this.nav.setRoot(FirstRunPage);      
		}
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

  openPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot('TabsPage');
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad HomePage');
  }
  
  getItems() {
	  
  }

}
