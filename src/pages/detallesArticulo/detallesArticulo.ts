// components
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

// providers
import { API } from '../../providers/api';

@IonicPage({
name: 'detallesArticulo'
})

@Component({
selector: 'page-detallesArticulo',
templateUrl: 'detallesArticulo.html'
})

export class DetallesArticuloPage {

detallesArticulo :any = {};
idArticulo : number = null;

constructor(
	public api:API,
	public navCtrl: NavController,
	public navParams:NavParams) {
	

		this.idArticulo = this.navParams.get("idArticulo");
		this.dameDetalles();
}

public dameDetalles() {
	this.api.getDetallesArticulo(this.idArticulo).then(
		(response) => {
			if (response) {
				this.detallesArticulo = response;
			}
		}
	);
}

}