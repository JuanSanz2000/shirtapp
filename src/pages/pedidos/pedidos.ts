// components
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

// providers
import { API } from '../../providers/api';


@IonicPage({
  name: 'pedidos'
})

@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})

export class PedidosPage {

  Pedidos :any = [];

  constructor(
    public api:API,
    public navCtrl: NavController) {
    
  }

  ionViewDidEnter() {
    this.damePedidos();
  }
  
  public damePedidos() {
    this.api.getPedidos().then(
      (response) => {
        if (response) {
          this.Pedidos = response;
        }
      }
    );
  }

  public dameDetallesPedido(id) {
	this.navCtrl.push("detallesPedido", { idPedido: id });
  }
}
