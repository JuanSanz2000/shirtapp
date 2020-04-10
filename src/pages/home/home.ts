// components
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

// providers
import { API } from '../../providers/api';

@IonicPage({
  name: 'home'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	Articulos :any = [];

    constructor(
		public api:API,
		public navCtrl: NavController) {
		this.dameArticulos();
    }

	public dameArticulos() {
		this.api.getArticulos().then(
			(response) => {
				if (response) {
					this.Articulos = response;
				}
			}
		);
	}
}