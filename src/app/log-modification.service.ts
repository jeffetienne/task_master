import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { LogModification } from './model/LogModification';
import { Constants } from './constants/constant';

@Injectable({
  providedIn: 'root'
})
export class LogModificationService {

  url = '/api/log_modifications'
  constructor(private http: Http) { }

  create(log: LogModification){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions});
    
    return this.http.post(Constants.server + ':' + Constants.port + this.url, JSON.stringify(log).toString(), requestOptions);
  }

  getLogs(){
    
    return this.http.get(Constants.server + ':' + Constants.port + this.url);
  }

  getLogByTable(table: string){
    return this.http.get(Constants.server + ':' + Constants.port + this.url + '/' + table);
  }
}
