import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {

  constructor(public api: Api) { }
  
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  getevents(params?: any) {
	let frindlist = [];	
	let seq = this.api.get('events', params).share();

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

}
