// components
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

// providers
import { API } from '../../providers/api';


@IonicPage({
  name: 'buscar'
})

@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})

export class BuscarPage {
	Articulos : any = [];

  	constructor(
    	public api:API,
    	public navCtrl: NavController) {

	}
	  
	public articulosBusqueda(ev) {
		const val = ev.target.value;
		
		if (val && val.length>3) {
			this.api.getArticulosBusqueda(val).then(
				(response) => {
					if (response) {
						this.Articulos = response;
					}
				}
			);
		}
			
	}
}
