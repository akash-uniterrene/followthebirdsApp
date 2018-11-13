import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

/**
 * Most apps have the concept of a Post. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This Post provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // Post fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class Post {
  feeds: any = [];

  constructor(public api: Api) { }

  
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  getfeeds(type,type_id,id,params?: any) {
	let seq = this.api.get('posts/'+type+'/'+type_id+'/'+id, params).share();

	// don't have the data yet
	return new Promise(resolve => {
		seq.subscribe((res: any) => {
			this.feeds.push(res);
			resolve(this.feeds);
		}, err => {
			console.error('ERROR', err);
		});
	});
  }

 
  publishPost(publisherInfo: any) {
    let seq = this.api.post('post', publisherInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  
}
