import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../providers';
import { FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the ViewMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-message',
  templateUrl: 'view-message.html',
})
export class ViewMessagePage {
  @ViewChild('postPhoto') postPhoto;	
  postPhotoOptions: FormGroup;
  private conversation : any = [];
  private messages : any = [];
  private imageURL = "https://dev.followthebirds.com/content/uploads/";
  
  public publishPhotos : any = [];
  
  public chatBox : any = {
	image: "",
	message: "dummy",
	message_id: "34",
	time: "",
	user_firstname: localStorage.getItem('user_firstname'),
	user_gender: localStorage.getItem("male"),
	user_id: localStorage.getItem('user_id'),
	user_lastname: localStorage.getItem('user_lastname'),
	user_name: localStorage.getItem('user_name'),
	user_picture: localStorage.getItem('user_picture')
  };
  
  private chatInfo : any = {
	message: '',
	user_id:localStorage.getItem('user_id')
  };
  
  private recipients = [];
  
  constructor(public navCtrl: NavController, public user: User, formBuilder: FormBuilder, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navParams: NavParams) {
	  this.postPhotoOptions = formBuilder.group({
		file: [],
		type: "photos",
		handle: "chat",
		multiple: true,
		user_id : localStorage.getItem('user_id')
	  });
	  this.conversation = navParams.get('conversation') || [];
	  
	  if(this.conversation.conversation_id) {
		this.chatInfo['conversation_id'] = this.conversation.conversation_id;
	  } else {
		this.recipients.push(this.conversation.id);
		console.log(this.conversation);
		this.chatInfo['recipients'] = this.recipients;
	  }
	}

	ionViewDidLoad() {	 
	  if(this.conversation.conversation_id) {		
		this.user.viewMessage({user_id:localStorage.getItem('user_id'),conversation_id:this.conversation.conversation_id}).then(data => {
			this.messages = data;	
		});
	  } else {
		this.user.getMessages({user_id:localStorage.getItem('user_id'),ids:this.conversation.id}).then(data => {
		   this.messages = data[0];
		   if(data[0].conversation_id){
			console.log(data[0].conversation_id);	
			this.chatInfo['conversation_id'] = data[0].conversation_id;
		   }
		});
	  }
	}
  
  sendMessage(){
	  this.user.postMessage(this.chatInfo).subscribe((resp) => {	
		this.chatInfo.message = '';
		this.chatBox.image = resp['image'];
		this.chatBox.message = resp['message'];
		this.chatBox.time = resp['time'];
		this.messages.messages.push(this.chatBox);
	}, (err) => {
		
	});
  }

  isToday(data){
	 var date = data.split(' ');
	 var today = new Date();
	 var dd = today.getDate();
	 var mm = today.getMonth()+1; 
	 var yyyy = today.getFullYear();
	 
	 var pDate = date[0].split('-');
	 if(pDate[0] != yyyy ){
		 return false;
	 }else{
		 if(pDate[1] != mm){
			 return false;
		 }else{
			 if(pDate[2] != dd){
				 return false;
			 }else{
				 return true;
			 }
		 }
	 }
	 
  }
  
  getBackgroundStyle(url) {
	if(!url){
		return 'url(assets/followthebirdImgs/no-profile-img.jpeg)'
	} else {
		return 'url(' + this.imageURL+url + ')'
	}
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
		this.chatInfo['photo'] = JSON.stringify(this.publishPhotos);
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
  
  goBack(){
	  this.navCtrl.pop();
  }
}
