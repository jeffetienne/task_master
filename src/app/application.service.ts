import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from './constants/constant';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  url = '/api/applications/'
  constructor(private http: Http) { }

  getApplications(){
    return this.http.get(Constants.server + ':' + Constants.port + this.url);
  }

  getApplicationByName(name: string){
    return this.http.get(Constants.server + ':' + Constants.port + this.url + name);
  }
}
