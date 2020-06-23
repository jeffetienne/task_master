import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from './constants/constant';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  url = '/api/status';
  constructor(private http:Http) { }

  getStatus(){
    return this.http.get(Constants.server + ':' + Constants.port + this.url);
  }

  getStatusById(id: number){
    return this.http.get(Constants.server + ':' + Constants.port + this.url + '/' + id);
  }
}
