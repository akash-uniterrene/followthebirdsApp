import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('sign_in', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('register', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
  
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  getfriends(params?: any) {
	let frindlist = [];	
	let seq = this.api.get('friends/66', '').share();

	// don't have the data yet
	return new Promise(resolve => {
		seq.subscribe((res: any) => {
			frindlist.push(res);
			resolve(frindlist);
		}, err => {
			console.error('ERROR', err);
		});
	});
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  getevents(params?: any) {
	let eventlist = [];	
	let seq = this.api.get('events/66', '').share();

	// don't have the data yet
	return new Promise(resolve => {
		seq.subscribe((res: any) => {
			eventlist.push(res);
			resolve(eventlist);
		}, err => {
			console.error('ERROR', err);
		});
	});
  }

  
  
}
