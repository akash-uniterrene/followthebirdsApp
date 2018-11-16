import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,Platform,  ViewController,ToastController,LoadingController } from 'ionic-angular';
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
  public userName: string;
  public userPic: string;
  public loading;
  postPhotoOptions: FormGroup;
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
  
  public publishPhotos : any = [];
  private feelings : any = []; 
  private feeling_type : any = []; 
  private icon;
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
    public modal: ViewController
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
		
      this.publisherInfo.handle = navParams.get('handle');
      this.publisherInfo.id = navParams.get('id');
	  console.log(navParams.get('handle'));
	  
  }
  
 
  ionViewDidLoad() {
    
  }

  closeModal(){
    this.modal.dismiss();
  }
  
  setUser(){    
    this.userName = (localStorage.getItem('user_fastname'))+' '+(localStorage.getItem('user_lastname')); 
	this.userPic = this.user.getProfilePic();
  }
  
  getFeelings(){
	  this.feelings = this.post.get_feelings();
	  console.log(this.feelings);
  }
  
  getFeelingType(index){
	  this.feeling_type = this.post.get_feeling_type(index);
	  console.log(this.feeling_type);
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
				this.uploadFromGallery();
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
		   this.postPhotoOptions.patchValue({ 'file': "data:image/jpeg;base64,"+imageData }); 
		   this.postPhotoOptions.patchValue({ 'multiple': false });
		   this.uploadPhoto(this.postPhotoOptions);
		 }, (err) => {
			alert('Unable to take photo');
		 });
	}
	
	uploadFromGallery(){
		this.postPhoto.nativeElement.click();
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
	
	setFeeling(feeling,index){
		console.log(index);
		this.feeling_type = [];
		this.publisherInfo.feeling_action = feeling.action;
		this.icon = feeling.icon;
		this.getFeelingType(index);
	}
	
	setFeelingType(type){
		this.publisherInfo.feeling_value = type;
		console.log(this.publisherInfo);
	}
	
	getBackgroundStyle(url) {
		if(!url){
			return 'url(assets/followthebirdImgs/no-profile-img.jpeg)'
		} else {
			return 'url(' + this.imageURL+url + ')'
		}
	}
}
