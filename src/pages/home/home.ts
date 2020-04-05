import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'home'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	miVariable = "hola chato";
	mostrar : boolean = true;

    constructor(public navCtrl: NavController) {

    }

}