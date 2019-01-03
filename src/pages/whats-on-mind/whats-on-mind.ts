import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,Platform,  ViewController,ToastController,LoadingController,ModalController } from 'ionic-angular';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { User } from '../../providers';
import { Post } from '../../providers/post/post';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the WhatsOnMindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-whats-on-mind',
  templateUrl: 'whats-on-mind.html',
})
export class WhatsOnMindPage {
  @ViewChild('postPhoto') postPhoto;
  @ViewChild('postVideo') postVideo;
  @ViewChild('postAudio') postAudio;
  @ViewChild('postFile') postFile;
  public userName: string;
  public userPic: string;
  public loading;
  postPhotoOptions: FormGroup;
  postVideoOptions: FormGroup;
  postAudioOptions: FormGroup;
  postFileOptions: FormGroup;
  private publisherInfo : any = {
	handle: '',
	id: '',
	message: '',
    album: '',
    feeling_action:'',
	feeling_value: '',
	location : '',
    privacy: 'public',
    link: '',
    poll_options:'',
    product:'',
    video:'',
    audio:'',
    file:'',
    photos: [],
	my_id: localStorage.getItem('user_id')
  };
  params: Object;
  pushPage: any;
  public publishPhotos : any = [];
  public icon;
  private imageURL = "https://dev.followthebirds.com/content/uploads/";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: User,
	formBuilder: FormBuilder,	
    public post: Post,  
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform, 
    private camera: Camera,
	public modalCtrl: ModalController,
    public modal: ViewController,
	private transfer: FileTransfer,
	private file: File
    ) {
		
      this.loading = this.loadingCtrl.create({
        content: 'Publishing Post...',
        dismissOnPageChange: true
      });
	  
      if(localStorage.getItem('user_id')){
        this.setUser();        
      }else{
        this.nav.setRoot('LoginPage');
      }
      
	  this.postPhotoOptions = formBuilder.group({
		file: [],
		type: "photos",
		handle: "publisher",
		multiple: true,
		user_id : localStorage.getItem('user_id')
	  });
	  
	  this.postVideoOptions = formBuilder.group({
		type: "video",
		handle: "publisher",
		multiple: true,
		user_id : localStorage.getItem('user_id')
	  });
	  
	  this.postAudioOptions = formBuilder.group({
		type: "audio",
		handle: "publisher",
		multiple: true,
		user_id : localStorage.getItem('user_id')
	  });
	  
	  this.postFileOptions = formBuilder.group({
		type: "file",
		handle: "publisher",
		multiple: true,
		user_id : localStorage.getItem('user_id')
	  });
		
	  if(navParams.get('id') == localStorage.getItem('user_id')){
		  this.publisherInfo.handle = "me";
	  } else {
		this.publisherInfo.handle = navParams.get('handle');
		this.publisherInfo.id = navParams.get('id');
	  }
      
	  
	  
	  if(navParams.get('files') && navParams.get('vault_type') == 'image'){
		this.publishPhotos = navParams.get('files');
		this.publisherInfo.photos = JSON.stringify(navParams.get('files'));
	  } if(navParams.get('files') && navParams.get('vault_type') == 'mp4'){
		var obj = {source: navParams.get('files')[0]};
		var myJSON = JSON.stringify(obj);
		this.publisherInfo.video = myJSON;
	  } else if(navParams.get('files') && navParams.get('vault_type') == 'mp3'){
		var obj = {source: navParams.get('files')[0]};
		var myJSON = JSON.stringify(obj);
		this.publisherInfo.audio = myJSON;  
	  } else if(navParams.get('files') && navParams.get('vault_type') == 'files'){
		var obj = {source: navParams.get('files')[0]};
		var myJSON = JSON.stringify(obj);
		this.publisherInfo.file = myJSON;    
	  }
	  
  }
  fileTransfer: FileTransferObject = this.transfer.create();
 
  ionViewDidLoad() {
    console.log(this.publisherInfo);
  }

  closeModal(){
    this.navCtrl.setRoot('HomePage');
  }
  
  setUser(){    
    this.userName = (localStorage.getItem('user_firstname'))+' '+(localStorage.getItem('user_lastname')); 
	this.userPic = this.user.getProfilePic();
  }
  
  getFeelings(){
	   let profileModal = this.modalCtrl.create('FeelingActivityPage');
	   profileModal.onDidDismiss(data => {
		 this.publisherInfo.feeling_action = data.feeling_action;
		 this.publisherInfo.feeling_value = data.feeling_value;
		 this.icon = data.icon;
	   });
	   profileModal.present();
	  /*this.nav.push('FeelingActivityPage');
	   this.feelings = this.post.get_feelings();
	  console.log(this.feelings); */
  }
  
  publishPost(){	
    this.loading.present();
      //Attempt to login in through our User service
      this.post.publishPost(this.publisherInfo).subscribe((resp) => {
        this.loading.dismiss();
        this.closeModal();
      }, (err) => {
        this.loading.dismiss();
        let toast = this.toastCtrl.create({
          message: "Unable to post. Retry",
          duration: 3000,
          position: 'top',
          dismissOnPageChange: true
        });
        toast.present();
        this.closeModal();
      });
  }

  uploadPicture() {
	const actionSheet = this.actionSheetCtrl.create({
	  title: 'Upload Photos',
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
			this.uploadFromGallery('photo');
		  }
		},{
		  icon: !this.platform.is('ios') ? 'ios-folder' : null,		
		  text: 'Upload from vault',
		  handler: () => {
			this.uploadFromVault('image');
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
  
  
  uploadAudio() {
	const actionSheet = this.actionSheetCtrl.create({
	  title: 'Upload Music ',
	  buttons: [
		{
		  icon: !this.platform.is('ios') ? 'ios-volume-up' : null,		
		  text: 'Upload Audio',
		  handler: () => {
			this.uploadFromGallery('audio');
		  }
		},{
		  icon: !this.platform.is('ios') ? 'ios-folder' : null,		
		  text: 'Upload from vault',
		  handler: () => {
			this.uploadFromVault('mp3');
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
  
  uploadVideo() {
	const actionSheet = this.actionSheetCtrl.create({
	  buttons: [
		{
		  icon: !this.platform.is('ios') ? 'ios-videocam' : null,		
		  text: 'Upload videos',
		  handler: () => {
			this.uploadFromGallery('video');
		  }
		},{
		  icon: !this.platform.is('ios') ? 'ios-folder' : null,		
		  text: 'Upload from vault',
		  handler: () => {
			this.uploadFromVault('mp4');
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
  
  uploadFromVault(filter){
	  console.log(this.publisherInfo.handle+this.publisherInfo.id);
	this.navCtrl.setRoot("VaultsPage",{'filter':filter,handle:this.publisherInfo.handle,handle_id:this.publisherInfo.id});
  }

  uploadFile() {
	const actionSheet = this.actionSheetCtrl.create({
	  buttons: [
		{
		  icon: !this.platform.is('ios') ? 'ios-attach' : null,		
		  text: 'Upload Attachment',
		  handler: () => {
			this.uploadFromGallery('file');
		  }
		},{
		  icon: !this.platform.is('ios') ? 'ios-folder' : null,		
		  text: 'Upload from vault',
		  handler: () => {
			this.uploadFromVault('files');
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
		  sourceType: this.camera.PictureSourceType.CAMERA,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE,
		  allowEdit:true,
		  targetWidth: 500,
		  targetHeight: 500,
		  saveToPhotoAlbum: true,
		  correctOrientation: true //Corrects Android orientation quirks
		};	
		
		this.camera.getPicture(options).then((imageData) => {
		  // imageData is either a base64 encoded string or a file URI
		   this.postPhotoOptions.patchValue({ 'file': "data:image/jpeg;base64,"+imageData }); 
		   this.postPhotoOptions.patchValue({ 'multiple': false });
		   this.uploadPhoto(this.postPhotoOptions);
		 }, (err) => {
			alert('Unable to take photo');
		 });
	}
	
	uploadFromGallery(type){
		if(type == 'photo'){
			this.postPhoto.nativeElement.click();
		} else if(type == 'video') {
			this.postVideo.nativeElement.click();
		}else if(type == 'audio') {
			this.postAudio.nativeElement.click();
		}else{
			this.postFile.nativeElement.click();
		}
	}
	
	processWebImage(event) {
		let reader = new FileReader();
		reader.onload = (readerEvent) => {
		 let imageData = (readerEvent.target as any).result;
		 this.postPhotoOptions.patchValue({ 'file': imageData });
         this.postPhotoOptions.patchValue({ 'multiple': false });
		 this.uploadPhoto(this.postPhotoOptions);	  
		};
		reader.readAsDataURL(event.target.files[0]);
	}
	
	processWebVideo(event) {
		this.postVideoOptions.patchValue({ 'multiple': false });
		this.uploadMedia(event.target.files[0],'video');
	}
	
	processWebAudio(event) {
		this.postAudioOptions.patchValue({ 'multiple': false });
		this.uploadMedia(event.target.files[0],'audio');
	}
	
	processWebFile(event) {
		this.postFileOptions.patchValue({ 'multiple': false });
		this.uploadMedia(event.target.files[0],'file');
	}
	
	uploadPhoto(params){
		let loading = this.loadingCtrl.create({
			content: 'Uploading...'
		});
		loading.present();
		 this.user.photoUploader(params).subscribe((resp) => {
			loading.dismiss();	
			this.publishPhotos.push(resp);
			this.publisherInfo.photos = JSON.stringify(this.publishPhotos);
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
	
	uploadMedia(file,type){
		let loading = this.loadingCtrl.create({
			content: 'Uploading...'
		});
		let mediaOptions;
		if(type == 'video'){
			mediaOptions = this.postVideoOptions.value;
		} else if(type == 'audio'){
			mediaOptions = this.postAudioOptions.value;
		}else {
			mediaOptions = this.postFileOptions.value;
		}
		
		loading.present();
		 this.user.fileUploader(file,mediaOptions).subscribe((resp) => {
			loading.dismiss();	
			var obj = {source: resp};
			var myJSON = JSON.stringify(obj);
			if(type == 'video'){
				this.publisherInfo.video = myJSON;
			} else if(type == 'audio'){
				this.publisherInfo.audio = myJSON;
			} else {
				this.publisherInfo.file = myJSON;
			}
			
			console.log(this.publisherInfo);
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
	
	getBackgroundStyle(url) {
		if(!url){
			return 'url(assets/followthebirdImgs/no-profile-img.jpeg)'
		} else {
			return 'url(' + this.imageURL+url + ')'
		}
	}
}