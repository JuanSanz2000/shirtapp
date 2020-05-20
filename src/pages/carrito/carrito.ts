// components
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

// providers
import { API } from '../../providers/api';


@IonicPage({
  name: 'carrito'
})

@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})

export class CarritoPage {
	carrito : any = [];
	totalCarrito : number = 0;

	constructor(
		public api:API,
		public navCtrl: NavController) {
	}

	ionViewDidEnter() {
		this.getCarrito();
	}

	getCarrito() {
		this.api.getCarrito().then(
			(response) => {
				if (response) {
					this.carrito = response;
					this.calculaTotal();
				}
			}
		);
	}

	calculaTotal() {
		this.totalCarrito = 0;
		this.carrito.lineas.forEach(element => {
			let subtotal: number = 0;
			subtotal = Number(element.cantidad) * Number(element.precio);
			this.totalCarrito += subtotal;
		});

	}

	borraLineaCarrito(linea) {
		this.api.borraLineaCarrito(linea.id).then(
			()=>{
                let index = this.carrito.lineas.indexOf(linea);
                if(index > -1){
					this.carrito.lineas.splice(index, 1);
					this.calculaTotal();
                }
			}
		);
	}

	confirmarPedido() {
		this.api.confirmarPedido(this.carrito.id).then(
			()=>{
				this.carrito.lineas = []
				this.carrito = {};
				this.navCtrl.push("pedidos");
			}
		)
	}
}
