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
tallas : any = ["S","M","L","XL"];
colores : any = ["Azul", "negro", "Verde"];
tallaElegida : string = "S";
colorElegido : string = "Azul";
cantidadElegida : number = 1;
datosCarrito : any = {};

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

public addCart() {
	
	if (this.tallaElegida && this.colorElegido && this.cantidadElegida>0) {
		
		this.api.getCarrito().then(
			(carrito) => {
				if (carrito) {
					console.log("Existe carrito, añadimos linea");
					this.addLinea(carrito);
				} else {
					this.api.creameCarro().then(
						(carrito) => {
							console.log("No existia carrito, lo creamos y luego añadimos la linea");
							this.addLinea(carrito);
						}
					)
				}
				
			}
		);

	}
	
}

addLinea(carrito) {
	this.datosCarrito = carrito;
	let datosLinea = { 'pedido_id': carrito.id, 'articulo_id': this.detallesArticulo.id,'color': this.colorElegido , 'talla': this.tallaElegida , 'cantidad': this.cantidadElegida, 'total': Number(this.detallesArticulo.precio) * Number(this.cantidadElegida) };
	this.api.insertarLineaPedido(datosLinea);
	this.navCtrl.push('carrito');
}

}