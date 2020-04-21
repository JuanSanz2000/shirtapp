import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class LocalStorageService {  
    
    constructor(public storage:Storage) {     }
  
    getToken() { return this.storage.get('token'); }
    setToken(token: string) { return this.storage.set('token', token);}
        
    
}