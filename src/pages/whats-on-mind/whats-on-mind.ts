import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ViewController,ToastController,LoadingController } from 'ionic-angular';
import { User } from '../../providers';
import { Post } from '../../providers/post/post';
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

  public userName: string;
  public userPic: string;
  public loading;
  private publisherInfo : any = {
		handle: 'user',
		id: '66',
		message: 'Happy to post',
		album: '',
		feeling_value: '',
		location : '',
		privacy: 'public',
		my_id: localStorage.getItem('user_id')
	}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: User,
    public post: Post,  
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public nav: NavController,
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhatsOnMindPage');
  }

  closeModal(){
    this.modal.dismiss();
  }
  setUser(){    
    this.userName = (localStorage.getItem('user_name'))+' '+(localStorage.getItem('user_lastname')); 
	this.userPic = this.user.getProfilePic();
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

}
