import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, ActionSheetController , ToastController, Platform, LoadingController, Slides} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { User } from '../../providers';
/**
 * Generated class for the GeneralInfoSlidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-general-info-slide',
  templateUrl: 'general-info-slide.html',
})
export class GeneralInfoSlidePage {
  @ViewChild('profilePhoto') profilePhoto;
	@ViewChild('coverPhoto') coverPhoto;	
  profilePic : any = "assets/followthebirdImgs/no-profile-img.jpeg";
	coverPic : any = "assets/followthebirdImgs/coverimage.png";
	fullname: string;
	isCoverUploaded: boolean = false;
  
	profilePhotoOptions: any = {
		file: "assets/followthebirdImgs/no-profile-img.jpeg",
		type: "photos",
		handle: "picture-user",
		multiple: false
	};
  
	coverPhotoOptions: any = {
		file: "assets/followthebirdImgs/coverimage.png",
		type: "photos",
		handle: "picture-user",
		multiple: false
	};
  
	
  constructor(
		public navCtrl: NavController, 
		public user: User, 
		public toastCtrl: ToastController, 
		public navParams: NavParams, 
		public platform: Platform, 
		public nav: Nav, 
		public actionSheetCtrl: ActionSheetController, 
		private camera: Camera,
		public loadingCtrl: LoadingController
		) {
			this.fullname = localStorage.getItem('user_firstname')+' '+localStorage.getItem('user_lastname');
  }
  intro(status: string){
    if(status == 'done'){
      localStorage.setItem('user_intro', 'true');
      this.nav.setRoot('HomePage');
    }
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
		  destinationType: this.camera.DestinationType.FILE_URI,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
		};
		
		this.camera.getPicture(options).then((imageData) => {
		  // imageData is either a base64 encoded string or a file URI
		  // If it's base64 (DATA_URL):
		  if(type == 'profile'){			  
			  this.profilePhotoOptions.file = imageData;
			  this.uploadProfilePhoto(this.profilePhotoOptions);
		  } else {
			this.coverPhotoOptions.file = imageData; 
			this.isCoverUploaded = true;
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
			 
			this.profilePhotoOptions.file = imageData	
			this.uploadProfilePhoto(this.profilePhotoOptions);
		 } else {
			this.coverPhotoOptions.file = imageData; 
			this.isCoverUploaded = true;
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
	
	
}
