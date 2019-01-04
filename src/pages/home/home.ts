import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams,  ToastController, MenuController } from 'ionic-angular';
import { FirstRunPage} from '../';
import { Post } from '../../providers/post/post';
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
	public user_live_notifications_counter = localStorage.getItem('user_live_notifications_counter');
	public user_live_messages_counter = localStorage.getItem('user_live_messages_counter');
	public user_live_requests_counter = localStorage.getItem('user_live_requests_counter');
  pages: PageList;
	introduction = 'PostPage';  
	settingsPage = 'UserSettingsPage';
	profilePage = 'ProfilePage';
	FriendRequestsPage = 'FriendRequestsPage';	
	NotificationsPage = 'NotificationsPage';	
	profilePageParams = { id: localStorage.getItem('user_id') };
	countCarItem = 99;
	badgeCount = 3;
  constructor(
    public navCtrl: NavController, 
		public user: User,
		public post: Post,  
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
		if(localStorage.getItem('user_firstname') || localStorage.getItem('user_id')){
		  if(localStorage.getItem('user_intro') != "true" && localStorage.getItem('user_picture_id') == 'null'){
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
  
  getMessages(){
	this.navCtrl.setRoot("MessagesPage");  
  }
  
  getcountCarItem(){
	  this.countCarItem = 99;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  
  getItems(ev) {
	  console.log(ev.target.value);
	  this.navCtrl.setRoot("SearchPage",{'event':ev.target.value});
  }
  
  getProfileData(id){
		this.user.updateProfile(id).subscribe((resp) => {	
			this.storage.setUser(resp);			
			localStorage.setItem('user_live_notifications_counter',resp['user_live_notifications_counter']);
			localStorage.setItem('user_live_requests_counter',resp['user_live_requests_counter']);
			localStorage.setItem('user_live_messages_counter',resp['user_live_messages_counter']);
			if(localStorage.getItem('user_live_notifications_counter') == '0'){
				localStorage.setItem('user_live_notifications_counter','0')
			}
			if(localStorage.getItem('user_live_requests_counter') == '0'){
				localStorage.setItem('user_live_requests_counter','0')
			}
			if(localStorage.getItem('user_live_messages_counter') == '0'){
				localStorage.setItem('user_live_messages_counter','0')
			}
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
