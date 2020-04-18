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
    this.damePedidosRealizados();
  }

  public damePedidosRealizados() {
    this.api.getPedidosRealizados().then(
      (response) => {
        if (response) {
          this.Pedidos = response;
        }
      }
    );
  }
}
