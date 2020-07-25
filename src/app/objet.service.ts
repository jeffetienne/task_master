import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from './constants/constant';

@Injectable({
  providedIn: 'root'
})
export class ObjetService {

  url = '/api/objets/';

  constructor(private http: Http) { }

  getObjets(){
    return this.http.get(Constants.server + ':' + Constants.port + this.url);
  }
  
  getObjetByName(name: string){
    return this.http.get(Constants.server + ':' + Constants.port + this.url + name);
  }
}
