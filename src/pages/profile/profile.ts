import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, ActionSheetController, ToastController, Platform, MenuController, LoadingController, } from 'ionic-angular';
import { FirstRunPage} from '../';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { User } from '../../providers';
import { StorageProvider } from '../../providers/storage/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	@ViewChild('profilePhoto') profilePhoto;
	@ViewChild('coverPhoto') coverPhoto;	
	profileName : string;
	profile : any = [];
	profilePhotoOptions: FormGroup;
	coverPhotoOptions: FormGroup;
	private imageURL = "https://dev.followthebirds.com/content/uploads/";
	private myId :number = parseInt(localStorage.getItem('user_id'));
	constructor(
		public navCtrl: NavController, 
		public user: User,
		public storage: StorageProvider,
		public toastCtrl: ToastController,
		public navParams: NavParams, 
		formBuilder: FormBuilder,	
		private camera: Camera,
		public platform: Platform, 
		public menu: MenuController,
		public nav: Nav,
		public actionSheetCtrl: ActionSheetController,
		public loadingCtrl: LoadingController	
    ) {
		this.profileName = navParams.get('user_name') || localStorage.getItem('user_name');
		this.profilePhotoOptions = formBuilder.group({
			file: "assets/followthebirdImgs/no-profile-img.jpeg",
			type: "photos",
			handle: "picture-user",
			multiple: false,
			user_id : localStorage.getItem('user_id')
		});
	  
		this.coverPhotoOptions = formBuilder.group({
			file: "assets/followthebirdImgs/coverimage.png",
			type: "photos",
			handle: "cover-user",
			multiple: false,
			user_id : localStorage.getItem('user_id')
		});
  }
	
	ionViewDidLoad(){
		this.user.getProfile(parseInt(localStorage.getItem('user_id')),{'user_name':this.profileName}).then(data => {
			this.profile = data;
		});
	}
	

	uploadProfilePicture() {
		const actionSheet = this.actionSheetCtrl.create({
		  title: 'Upload Profile Picture',
		  buttons: [
			{
			  icon: !this.platform.is('ios') ? 'ios-camera' : null,	
			  text: 'Take a Picture',
			  handler: () => {
				this.takeCameraSnap('profile')
			  }
			},{
			  icon: !this.platform.is('ios') ? 'ios-images' : null,		
			  text: 'Upload from gallery',
			  handler: () => {
				this.uploadFromGallery("profile")
			  }
			},{
			  icon: !this.platform.is('ios') ? 'close' : null,
			  text: 'Cancel',
			  role: 'cancel',
			  handler: () => {
			  }
			}
		  ]
		});
		actionSheet.present();
	}
	
	uploadCoverPicture() {
		const actionSheet = this.actionSheetCtrl.create({
		  title: 'Upload Cover Picture',
		  buttons: [
			{
			  icon: !this.platform.is('ios') ? 'ios-camera' : null,	
			  text: 'Take a Picture',
			  handler: () => {
				this.takeCameraSnap('cover')
			  }
			},{
			  icon: !this.platform.is('ios') ? 'ios-images' : null,		
			  text: 'Upload from gallery',
			  handler: () => {
				this.uploadFromGallery("cover")
			  }
			},{
			  icon: !this.platform.is('ios') ? 'close' : null,
			  text: 'Cancel',
			  role: 'cancel',
			  handler: () => {
			  }
			}
		  ]
		});
		actionSheet.present();
	}
  
	takeCameraSnap(type){
		const options: CameraOptions = {
		  quality: 100,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
		};
		
		this.camera.getPicture(options).then((imageData) => {
		  // imageData is either a base64 encoded string or a file URI
		  if(type == 'profile'){			  
			this.profilePhotoOptions.patchValue({ 'file': "data:image/jpeg;base64,"+imageData }); 
			this.uploadProfilePhoto(this.profilePhotoOptions);
		  } else {
			this.coverPhotoOptions.patchValue({ 'file': "data:image/jpeg;base64,"+imageData }); 
			this.uploadCoverPhoto(this.coverPhotoOptions); 
		  }
		 }, (err) => {
			alert('Unable to take photo');
		 });
	}
	
	uploadFromGallery(type){
		if(type == 'profile'){ 
			this.profilePhoto.nativeElement.click(); 
		} else { 
			this.coverPhoto.nativeElement.click(); 
		}
	}
	
	processWebImage(event,type) {
		let reader = new FileReader();
		reader.onload = (readerEvent) => {
		let imageData = (readerEvent.target as any).result;
		 if(type == 'profile'){
			this.profilePhotoOptions.patchValue({ 'file': imageData }); 
			this.uploadProfilePhoto(this.profilePhotoOptions);
		 } else {
			this.coverPhotoOptions.patchValue({ 'file': imageData });  
			this.uploadCoverPhoto(this.coverPhotoOptions); 
			
		 }		  
		};
		reader.readAsDataURL(event.target.files[0]);
	}
	  
	uploadProfilePhoto(params){

		let loading = this.loadingCtrl.create({
			content: 'Uploading...'
		});
		loading.present();

		 this.user.photoUploader(params).subscribe((resp) => {
			loading.dismiss();	
			this.profile.user_picture = resp;
			localStorage.setItem('user_picture',this.profile.user_picture);	
			let toast = this.toastCtrl.create({
				message: "Profile photo updated!",
				duration: 3000,
				position: 'top'
			});
			toast.present();

		}, (err) => {
			loading.dismiss();		
		  let toast = this.toastCtrl.create({
			message: "image uploading failed",
			duration: 3000,
			position: 'top'
		  });
		  toast.present();
		});
	}
	
	
	uploadCoverPhoto(params){
		let loading = this.loadingCtrl.create({
			content: 'Uploading...'
		});
		loading.present();
		this.user.photoUploader(params).subscribe((resp) => {	
			loading.dismiss();
			this.profile.user_cover = resp;
			localStorage.setItem('user_cover',this.profile.user_cover);
			let toast = this.toastCtrl.create({
				message: "Cover photo updated!",
				duration: 3000,
				position: 'top'
			});
			toast.present();
		}, (err) => {
			loading.dismiss();
		  let toast = this.toastCtrl.create({
			message: "image uploading failed",
			duration: 3000,
			position: 'top'
		  });
		  toast.present();
		});
	}
	getProfileImageStyle() {
		return this.profilePhotoOptions.controls['file'].value;
	}
	
	getCoverImageStyle() {
		return this.coverPhotoOptions.controls['file'].value;
	}
	
	// Attempt to login in through our User service
	/* profileReload(user_id) {
		let loading = this.loadingCtrl.create({
			content: 'reloding details...'
		});
		
		loading.present();
		this.user.updateProfile(user_id).subscribe((resp) => {			
			loading.dismiss();			
			this.storage.setUser(resp);			
			this.nav.setRoot('HomePage',resp);
		}, (err) => {
			loading.dismiss();
		  let toast = this.toastCtrl.create({
			message: "unable to reload. please check your connection",
			duration: 3000,
			position: 'top'
		  });
		  toast.present();
		});
	} */
	
	getCoverBackgroundStyle() {
		if(!this.profile.user_cover){
			return 'url(assets/followthebirdImgs/coover_dummy.png)'
		} else {
			return 'url(' + this.imageURL+this.profile.user_cover + ')'
		}
	}
	
	friendsAction() {
		const actionSheet = this.actionSheetCtrl.create({
		  title: 'Response to friend',
		  buttons: [
			{
			  icon: !this.platform.is('ios') ? 'ios-person-add' : null,	
			  text: 'Confirm',
			  handler: () => {
				this.takeCameraSnap('cover')
			  }
			},{
			  icon: !this.platform.is('ios') ? 'ios-close' : null,		
			  text: 'Delete Request',
			  handler: () => {
				this.uploadFromGallery("cover")
			  }
			}
		  ]
		});
		actionSheet.present();
	}
	
	responseAction() {
		const actionSheet = this.actionSheetCtrl.create({
		  buttons: [
			{
			  icon: !this.platform.is('ios') ? 'ios-person-add' : null,	
			  text: 'Confirm',
			  handler: () => {
				this.connectAction('friend-accept')
			  }
			},{
			  icon: !this.platform.is('ios') ? 'ios-close' : null,		
			  text: 'Delete Request',
			  handler: () => {
				this.connectAction("friend-decline")
			  }
			}
		  ]
		});
		actionSheet.present();
	}
	
	sentAction() {
		const actionSheet = this.actionSheetCtrl.create({
		  title: 'Response to friend',
		  buttons: [
			{
			  icon: !this.platform.is('ios') ? 'ios-person-add' : null,	
			  text: 'Confirm',
			  handler: () => {
				this.takeCameraSnap('cover')
			  }
			},{
			  icon: !this.platform.is('ios') ? 'ios-close' : null,		
			  text: 'Delete Request',
			  handler: () => {
				this.uploadFromGallery("cover")
			  }
			}
		  ]
		});
		actionSheet.present();
	}
	
	followingAction() {
		const actionSheet = this.actionSheetCtrl.create({
		  title: 'Response to friend',
		  buttons: [
			{
			  icon: !this.platform.is('ios') ? 'ios-person-add' : null,	
			  text: 'Confirm',
			  handler: () => {
				this.takeCameraSnap('cover')
			  }
			},{
			  icon: !this.platform.is('ios') ? 'ios-close' : null,		
			  text: 'Delete Request',
			  handler: () => {
				this.uploadFromGallery("cover")
			  }
			}
		  ]
		});
		actionSheet.present();
	}
	
	followAction() {
		const actionSheet = this.actionSheetCtrl.create({
		  title: 'Response to friend',
		  buttons: [
			{
			  icon: !this.platform.is('ios') ? 'ios-person-add' : null,	
			  text: 'Confirm',
			  handler: () => {
				this.takeCameraSnap('cover')
			  }
			},{
			  icon: !this.platform.is('ios') ? 'ios-close' : null,		
			  text: 'Delete Request',
			  handler: () => {
				this.uploadFromGallery("cover")
			  }
			}
		  ]
		});
		actionSheet.present();
	}
	
	moreAction() {
		const actionSheet = this.actionSheetCtrl.create({
		  buttons: [
			{
			  icon: !this.platform.is('ios') ? 'ios-person-add' : null,	
			  text: 'Confirm',
			  handler: () => {
				this.connectAction('friend-accept')
			  }
			},{
			  icon: !this.platform.is('ios') ? 'ios-close' : null,		
			  text: 'Delete Request',
			  handler: () => {
				this.connectAction("friend-decline")
			  }
			}
		  ]
		});
		actionSheet.present();
	}
	
	listFriends(){
		
		this.navCtrl.push('FriendsPage');
	}
	
	connectAction(type){
		let params :any = {
			'do': type,
			'id': this.profile.user_id,
			'my_id' : localStorage.getItem('user_id')
		};
		this.user.connection(params).subscribe((resp) => {						
			
		}, (err) => {
		
		});
	}
	
}
