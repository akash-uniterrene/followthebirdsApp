import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, ActionSheetController, ToastController, Platform, MenuController, LoadingController, } from 'ionic-angular';
import { FirstRunPage} from '../';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Post } from '../../providers/post/post';
import { EventsProvider } from '../../providers/events/events';
import { User } from '../../providers';
import { StorageProvider } from '../../providers/storage/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoViewer,PhotoViewerOptions } from '@ionic-native/photo-viewer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the EventProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-profile',
  templateUrl: 'event-profile.html',
})
export class EventProfilePage {
  @ViewChild('coverPhoto') coverPhoto;		
  eventDetailszone: string = "details";
  public eventProfile : any = [];
  public eventProfileId : any;
  public postElement = [];
  public is_going = 0;
  public is_interested = 0;
  public is_invited = 0;
  public status = 0;
  coverPhotoOptions: FormGroup;
  postFeeds: any = [];
  post_type: any = {
	shared: 'shared',
	link: 'shared a link',
	poll: 'created a poll',
	product: 'added new product for sell',
	article: 'added new article',
	video : 'added a video',
	audio: 'added an audio',
	file: 'added a file',
	photos: 'added a photo',
	profile_picture: 'updated his profile picture',
	profile_cover: 'updated his cover photo',
	page_picture: 'updated page picture',
	page_cover: 'updated cover photo',
	group_picture: 'updated group picture',
	group_cover: 'updated group cover',
	event_cover: 'updated event cover'
  };
  
  private myId : number = parseInt(localStorage.getItem('user_id'));
  private imageURL = "https://dev.followthebirds.com/content/uploads/";	
  constructor(
	public navCtrl: NavController, 
	public user: User,
	public post: Post,
	public storage: StorageProvider,
	public toastCtrl: ToastController,
	public navParams: NavParams, 
	formBuilder: FormBuilder,	
	private camera: Camera,
	public platform: Platform, 
	public menu: MenuController,
	public nav: Nav,
	public actionSheetCtrl: ActionSheetController,
	private photoViewer: PhotoViewer,
	public loadingCtrl: LoadingController,
	public events: EventsProvider,
	private transfer: FileTransfer,
	private file: File		
  ) {
	  this.eventProfileId = navParams.get('eventProfile') || 3;
	  this.events.getEventProfile(parseInt(this.eventProfileId),{'user_id':localStorage.getItem('user_id'),'filter':'all'}).then(data => {
		this.eventProfile = data;
		this.getPost();	
		this.postElement['handle'] = "event";
		this.postElement['id'] = this.eventProfile['event_id'];	
	 });
	this.coverPhotoOptions = formBuilder.group({
		file: "assets/followthebirdImgs/coverimage.png",
		type: "photos",
		handle: "cover-event",
		multiple: false,
		id: '',
		user_id : localStorage.getItem('user_id')
	});
  }

  ionViewDidLoad() {

  }
  
  getPost(){
	this.post.getfeeds('posts_event',this.eventProfile['event_id'],localStorage.getItem('user_id'))
		.then(data => {
			let item = data[0];
			for (var key in item) {
			  this.postFeeds.push(item[key]);
			}
	});
	this.is_going = this.eventProfile.i_joined['is_going']; 
	this.is_interested = this.eventProfile.i_joined['is_interested']; 
	this.is_invited = this.eventProfile.i_joined['is_invited']; 
	this.status = this.eventProfile.i_joined['status']; 
  }
  
  getCoverBackgroundStyle() {
	if(!this.eventProfile.event_cover){
		return 'url(assets/followthebirdImgs/coover_dummy.png)'
	} else {
		return 'url(' + this.imageURL+this.eventProfile.event_cover + ')'
	}
  }
  
  uploadCoverPicture() {
		const actionSheet = this.actionSheetCtrl.create({
		  title: 'Upload Cover Picture',
		  buttons: [
			{
			  icon: !this.platform.is('ios') ? 'ios-camera' : null,	
			  text: 'Take a Picture',
			  handler: () => {
				this.takeCameraSnap()
			  }
			},{
			  icon: !this.platform.is('ios') ? 'ios-images' : null,		
			  text: 'Upload from gallery',
			  handler: () => {
				this.uploadFromGallery()
			  }
			},{
			  icon: !this.platform.is('ios') ? 'trash' : null,
			  text: 'Remove cover photo',
			  handler: () => {
				  this.removePhoto({"my_id":localStorage.getItem('user_id'),"handle":"cover-event","id":this.eventProfile.event_id})
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
  
	takeCameraSnap(){
		const options: CameraOptions = {
		  quality: 100,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
		};
		
		this.camera.getPicture(options).then((imageData) => {
		  // imageData is either a base64 encoded string or a file URI
		  this.coverPhotoOptions.patchValue({ 'file': "data:image/jpeg;base64,"+imageData }); 
		  this.uploadCoverPhoto(this.coverPhotoOptions); 
		 }, (err) => {
			alert('Unable to take photo');
		 });
	}
	
	uploadFromGallery(){
		this.coverPhoto.nativeElement.click(); 
	}
	
	processWebImage(event,type) {
		let reader = new FileReader();
		reader.onload = (readerEvent) => {
		let imageData = (readerEvent.target as any).result;
		 this.coverPhotoOptions.patchValue({ 'file': imageData }); 				
		 this.uploadCoverPhoto(this.coverPhotoOptions); 
		};
		reader.readAsDataURL(event.target.files[0]);
	}
	
	uploadCoverPhoto(params){
		this.coverPhotoOptions.patchValue({ 'id': this.eventProfile['event_id'] }); 
		let loading = this.loadingCtrl.create({
			content: 'Uploading...'
		});
		loading.present();
		this.user.photoUploader(params).subscribe((resp) => {	
			loading.dismiss();
			this.eventProfile.event_cover = resp;
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
	
	removePhoto(params) {
		let loading = this.loadingCtrl.create({
			content: 'Removing...'
		});
		loading.present();
		 this.user.photoRemover(params).subscribe((resp) => {
			loading.dismiss();	
			let toast = this.toastCtrl.create({
				message: "Profile photo removed!",
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
	
  
    eventGoAction(type,uid){
		this.connectAction(type);
		this.is_going = 1;
	}

	eventUngoAction(type,uid){
		this.connectAction(type);
		this.is_going = 0;
	}

	eventInterestAction(type){
		this.connectAction(type);
		this.is_interested = 1;
	}

	eventUninterestAction(type){
		this.connectAction(type);
		this.is_interested = 0;
	}

	getBackgroundStyle(url) {
		if(!url){
			return 'url(assets/followthebirdImgs/no-profile-img.jpeg)'
		} else {
			return 'url(' + this.imageURL+url + ')'
		}
	}
  
  connectAction(type,uid?: any){
	let params :any = {
		'do': type,
		'id': this.eventProfile.event_id,
		'uid': uid,
		'my_id' : localStorage.getItem('user_id')
	};
	this.user.connection(params).subscribe((resp) => {						
		
	}, (err) => {
	
	});
 }

}
