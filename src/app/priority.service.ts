import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from './constants/constant';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  url = '/api/priorities/'
  constructor(private http: Http) { }

  getPriorities(){
    return this.http.get(Constants.server + ':' + Constants.port + this.url);
  }

  getPriorityByName(name: string){
    return this.http.get(Constants.server + ':' + Constants.port + this.url + name);
  }
}
