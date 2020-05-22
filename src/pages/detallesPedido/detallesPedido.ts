// components
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

// providers
import { API } from '../../providers/api';

@IonicPage({
name: 'detallesPedido'
})

@Component({
selector: 'page-detallesPedido',
templateUrl: 'detallesPedido.html'
})

export class DetallesPedidoPage {

lineasPedido :any = [];
idPedido : number = null;
PrecioFinal :number = 0;

constructor(
	public api:API,
	public navCtrl: NavController,
	public navParams:NavParams) {
	

		this.idPedido = this.navParams.get("idPedido");
		this.dameDetallesPedido();
}

public dameDetallesPedido() {
	this.api.getDetallesPedido(this.idPedido).then(
		(response) => {
			if (response) {
				this.lineasPedido = response;
				this.calculaTotal();
			}
		}
	);
}

calculaTotal() {
	this.PrecioFinal = 0;
	this.lineasPedido.forEach(element => {
		let subtotal: number = 0;
		subtotal = Number(element.cantidad) * Number(element.precio);
		this.PrecioFinal += subtotal;
	});

}

}