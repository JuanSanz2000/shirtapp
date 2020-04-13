import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage( {
})

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'home';
  tab2Root = 'buscar';
  tab3Root = 'carrito';
  tab4Root = 'pedidos';

  constructor() {

  }
}
