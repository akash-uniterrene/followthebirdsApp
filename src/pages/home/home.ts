import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams,  ToastController, MenuController } from 'ionic-angular';
import { FirstRunPage} from '../';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { User } from '../../providers';
import { StorageProvider } from '../../providers/storage/storage';
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
  public savedUser : any;
  pages: PageList;

  introduction = 'CardsPage';  
  settingsPage = 'UserSettingsPage';
 
  constructor(
    public navCtrl: NavController, 
	public user: User,
	public storage: StorageProvider,
	public toastCtrl: ToastController,
    public navParams: NavParams,  
    private camera: Camera,
    public menu: MenuController,
    public nav: Nav 
    ) {
     // localStorage.setItem('user_intro', 'false');
    
		this.menu.enable(false); 
		  
		this.getProfileData(localStorage.getItem('user_id'));
		this.sliderOpen();
	  }	  	  
	sliderOpen(){		 
		if(localStorage.getItem('user_firstname') && localStorage.getItem('user_id')){
		  if(localStorage.getItem('user_intro') != "true"){
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
  
  
  getProfileData(id){
	this.user.updateProfile(id).subscribe((resp) => {	
		this.storage.setUser(resp);			
	}, (err) => {
	  let toast = this.toastCtrl.create({
		message: "unable to refresh",
		duration: 3000,
		position: 'top'
	  });
	  toast.present();
	});	
  }

}
