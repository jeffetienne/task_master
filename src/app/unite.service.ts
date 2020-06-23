import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from './constants/constant';

@Injectable({
  providedIn: 'root'
})
export class UniteService {

  url = '/api/unites';
  constructor(private http:Http) { }

  getUnites(){
    return this.http.get(Constants.server + ':' + Constants.port + this.url);
  }

  getUnite(id: number){
    return this.http.get(Constants.server + ':' + Constants.port + this.url + '/' + id);
  }
}
