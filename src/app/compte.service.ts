import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Compte } from './model/Compte';
import { Constants } from './constants/constant';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  getCompte(id: number) {
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});
    
    return this.http.get(Constants.server + ':' + Constants.port + this.url + '/' + id);
  }

  url = '/api/creation_comptes'
  constructor(private http: Http) { }

  create(compte: Compte){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions});
    
    return this.http.post(Constants.server + ':' + Constants.port + this.url, JSON.stringify(compte).toString(), requestOptions);
  }

  update(id: number, compte: Compte){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions});

    return this.http.put(Constants.server + ':' + Constants.port + this.url + '/' + id, JSON.stringify(compte).toString(), requestOptions)
  }

  getComptes(){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});
    
    return this.http.get(Constants.server + ':' + Constants.port + this.url);
  }
}
