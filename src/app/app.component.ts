import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalStorageService } from '../providers/localStorage.service';


@Component({
  	templateUrl: 'app.html'
})
export class MyApp {
	  rootPage:any = 'tabs';
	  @ViewChild(Nav) nav:Nav;

  constructor(platform: Platform, 
				statusBar: StatusBar,
				splashScreen: SplashScreen,
				public localStorage: LocalStorageService) {
		
			platform.ready().then(() => {
				statusBar.styleDefault();
				splashScreen.hide();
			});

		
  }

  cerrarSesion() {
	this.localStorage.clearToken().then(
		() => {		this.nav.setRoot('tabs'); }
	);
  }
}
