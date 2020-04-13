import { Injectable }               from '@angular/core';
import { HttpClient, HttpHeaders}   from "@angular/common/http";
import {Platform} from "ionic-angular";
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class API {  
   
    ApiURL : string = "http://localhost:8000/api/";
    
    headers = new HttpHeaders({'Content-Type': 'application/json'});
    headersRaw = new HttpHeaders({'Content-Type': 'text/plain'})
   
    constructor(public http:HttpClient,
                public platform: Platform
                ) {                  
 
    }
   
    public getArticulos() {
        let url = this.ApiURL + "articulos";
        return this.noTokenRequest(url);
    }

    public getOfertas() {
        let url = this.ApiURL + "ofertas";
        return this.noTokenRequest(url);
    }
    
    public getArticulosBusqueda(strBusqueda) {
        let url = this.ApiURL + "busqueda/"  + strBusqueda;
        return this.noTokenRequest(url);
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
 

   
}