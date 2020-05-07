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
	this.dameOfertas();
}

public dameOfertas() {
	this.api.getOfertas().then(
		(response) => {
			if (response) {
				this.Articulos = response;
			}
		}
	);
}

public dameDetalles(id) {
	this.navCtrl.push("detallesArticulo", { idArticulo: id });
}

public insertarCarrito() {
	
}

}