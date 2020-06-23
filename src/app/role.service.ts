import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from './constants/constant';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url = '/api/roles';
  constructor(private http: Http) { }

  getRoles(){
    return this.http.get(Constants.server + ':' + Constants.port + this.url);
  }

  getRole(id: number){
    return this.http.get(Constants.server + ':' + Constants.port + this.url + '/' + id);
  }
}
