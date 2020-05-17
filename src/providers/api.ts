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
        return this.tokenRequest(url);
    }

    public getOfertas() {
        let url = this.ApiURL + "ofertas";
        return this.tokenRequest(url);
    }
    
    public getDetallesArticulo(idArticulo) {
        let url = this.ApiURL + "articulo/" + idArticulo;
        return this.tokenRequest(url);
    }

    public getArticulosBusqueda(strBusqueda) {
        let url = this.ApiURL + "busqueda/"  + strBusqueda;
        return this.tokenRequest(url);
    }

    public getCarrito() {
        let url = this.ApiURL + "carrito";
        return this.tokenRequest(url);
    }

    public borraLineaCarrito(lineaId) {
        let url = this.ApiURL + "carrito/linea/" + lineaId;
        return this.tokenDelete(url);
    }

    public insertarLineaPedido(datosLinea) {
        let url = this.ApiURL + "carrito/linea";
        return this.tokenRequestPost(url, datosLinea);
    } 

    public addCarrito(datosArticulo) {
        let datosEnviar = { 'idArticulo': datosArticulo.id, 'talla': datosArticulo.talla, 'color': datosArticulo.color};
        let url = this.ApiURL + "carrito";
        return this.tokenRequestPost(url, datosEnviar);
    }

    public confirmarPedido(pedidoId){
        let url = this.ApiURL + "carrito/confirma/" + pedidoId;
        return this.tokenRequest(url);
    }

    public creameCarro() {
        let url = this.ApiURL + "carrito/nuevo";
        return this.tokenRequest(url);
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
 
    tokenDelete(path: string): Promise<any> {
        return this.localStorage.getToken().then(token=>{
            if (token) {
                let headersAuth = new HttpHeaders({'Accept': 'application/json','Authorization': 'Bearer ' + token});
                return this.http.delete(path, { headers: headersAuth })
                .toPromise()
                .then(response => {        
                    return response;
                })
                .catch(error => {
                    if (error.status=="401") {
                        this.goToLogin();
                    } else {
                        return Promise.reject({Error: "noconn"});
                    }
                });
            } else {
                this.goToLogin();
            }
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