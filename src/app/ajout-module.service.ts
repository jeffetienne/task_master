import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { AjoutModule } from './model/AjoutModule';
import { Constants } from './constants/constant';

@Injectable({
  providedIn: 'root'
})
export class AjoutModuleService {

  url = '/api/ajout_modules/'
  constructor(private http: Http) { }

  create(ajoutModule: AjoutModule){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions});
    
    return this.http.post(Constants.server + ':' + Constants.port + this.url, JSON.stringify(ajoutModule).toString(), requestOptions);
  }
}
