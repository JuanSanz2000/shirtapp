// components
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

// providers
import { API } from '../../providers/api';


@IonicPage({
  name: 'login'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  constructor(
    public api:API,
    public navCtrl: NavController) {
  }
}
