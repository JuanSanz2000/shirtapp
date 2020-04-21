import { Injectable }               from '@angular/core';
import { HttpClient, HttpHeaders}   from "@angular/common/http";
import {Platform, App} from "ionic-angular";
import 'rxjs/add/operator/toPromise';
 
import {LocalStorageService} from './localStorage.service';

@Injectable()
export class API {  
   
    ApiURL : string = "http://localhost:8000/api/";
    
    headers = new HttpHeaders({'Content-Type': 'application/json'});
    headersRaw = new HttpHeaders({'Content-Type': 'text/plain'})
   
    constructor(public http:HttpClient,
                private app:App,
                public localStorage: LocalStorageService,
                public platform: Platform
                ) {                  
 
    }
   
    public getArticulos() {
        let url = this.ApiURL + "articulos";
        return this.noTokenRequest(url);
    }

    public getOfertas() {
        let url = this.ApiURL + "ofertas";
        return this.tokenRequest(url);
    }
    
    public getArticulosBusqueda(strBusqueda) {
        let url = this.ApiURL + "busqueda/"  + strBusqueda;
        return this.noTokenRequest(url);
    }

    public getPedidos() {
        let url = this.ApiURL + "pedidos";
        return this.tokenRequest(url);
    }

    public login(email, password) {
        let datos = { 'email': email, 'password': password};
        let url = this.ApiURL + "login";
        return this.noTokenRequestPost(datos, url);
    }

    noTokenRequest(path: string): Promise<any> {
            return this.http.get(path, { headers: this.headers })
                .toPromise()
                .then(response => {
                    return response;
                })
                .catch(error => {
                    return Promise.reject(error);
                });
    }
 
    noTokenRequestPost(datos: any, path: string): Promise<any> {
            return this.http.post(path, datos, { headers: this.headers })
                .toPromise()
                .then(response => {
                    return response;
                })
                .catch(error => {
                    return Promise.reject(error);
                });
    }
 
 
    noTokenDelete(path: string): Promise<any> {
            return this.http.delete(path)
                .toPromise()
                .then(response => {
                return response;
                })
                .catch(error => {
               
                });
        
    }
 
    tokenRequestPost(path: string, body: any): Promise<any> {
            return this.localStorage.getToken().then(token => {
            
                if (token) {
                    let headersAuth = new HttpHeaders({
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token
                        });

                    return this.http.post(path, body, {headers: headersAuth})
                        .toPromise()
                        .then(response => {
                        return response;
                        })
                        .catch(error => {
                            if(error.status=='401') this.goToLogin();
                        });
                } else {
                    this.goToLogin();
                }
            
        });
    }

    tokenRequest(path: string): Promise<any> {
        return this.localStorage.getToken().then(token => {
        
            if (token) {
                let headersAuth = new HttpHeaders({
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                    });

                return this.http.get(path, {headers: headersAuth})
                    .toPromise()
                    .then(response => {
                    return response;
                    })
                    .catch(error => {
                        if(error.status=='401') this.goToLogin();
                    });
            } else {
                this.goToLogin();
            }
        
    });
}
        
    goToLogin() {
        this.app.getRootNavs()[0].setRoot('login');
    }
}