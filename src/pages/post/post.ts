import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams,  ToastController, MenuController } from 'ionic-angular';
import { FirstRunPage} from '../';
import { Post } from '../../providers/post/post';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { User } from '../../providers';
import { StorageProvider } from '../../providers/storage/storage';
import { PhotoViewer,PhotoViewerOptions } from '@ionic-native/photo-viewer';

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
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
   public postElement = [];
   private pageCount = 2;
   private arrayPosition = 0;
   private mediapath = "https://dev.followthebirds.com/content/uploads/";
   constructor(
    public navCtrl: NavController, 
    public user: User,
    public post: Post,  
    public storage: StorageProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams,  
    private camera: Camera,
    public menu: MenuController,
	private photoViewer: PhotoViewer,
    public nav: Nav 
  ) {
  }

  ionViewDidLoad() {
	this.postElement['handle'] = "me";
	this.postElement['id'] = '';  
    this.post.getfeeds('newsfeed',localStorage.getItem('user_id'),localStorage.getItem('user_id'),{})
    .then(data => {
		this.postFeeds = [];
		let item = data[0];
		for (var key in item) {
		  this.postFeeds.push(item[key]);
		}
    });
  }
  
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.post.getfeeds('newsfeed',localStorage.getItem('user_id'),localStorage.getItem('user_id'),{'page': this.pageCount})
		.then(data => {			
			if(data[0].length > 0) {
				let item = data[0];
				for (var key in item) {
				  this.postFeeds.push(item[key]);
				}
			}
		});
	  this.pageCount = this.pageCount + 1;
      infiniteScroll.complete();
    }, 500);
  }
  
  doRefresh(refresher) {
	this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
 
  viewImage(url){
	const option : PhotoViewerOptions = {
		  share: true
		};
	this.photoViewer.show(this.mediapath+url,"Image Preview",option);
  }
  
  
  viewProfile(user_name,user_id) {
		this.nav.setRoot('ProfilePage', {user_name: user_name,user_id:user_id});
	} 

}
