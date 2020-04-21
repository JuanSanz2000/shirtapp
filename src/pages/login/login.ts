// components
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

// providers
import { API } 					from '../../providers/api';
import { LocalStorageService } from '../../providers/localStorage.service';

@IonicPage({
  	name: 'login'
})

@Component({
  	selector: 'page-login',
  	templateUrl: 'login.html',
})

export class LoginPage {

	clienteEmail:string = null;
	clientePassword:string = null;

	  constructor(public api:API, 
		public navCtrl: NavController,
		public localStorage: LocalStorageService
		) {
		this.loginCliente();
    }

	loginCliente() {
		if (this.clienteEmail!=null && this.clientePassword!=null) {
			this.api.login(this.clienteEmail, this.clientePassword).then(
				(response) => {
					if (response.cliente.id!=null) {
						console.log();
						this.localStorage.setToken(response.token);
						this.navCtrl.setRoot('tabs');
					}
					
				}
			);
		}
	}

}
