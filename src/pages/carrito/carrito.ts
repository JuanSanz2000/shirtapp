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
  constructor(
    public api:API,
    public navCtrl: NavController) {
  }
}
