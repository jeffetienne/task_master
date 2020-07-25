import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Constants } from './constants/constant';
import { Task } from './model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = '/api/tasks/'
  constructor(private http: Http) { }

  getTasks(){
    return this.http.get(Constants.server + ':' + Constants.port + this.url);
  }

  getTask(id: string){
    return this.http.get(Constants.server + ':' + Constants.port + this.url + id);
  }

  create(task: Task){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions});
    
    return this.http.post(Constants.server + ':' + Constants.port + this.url, JSON.stringify(task).toString(), requestOptions);
  }

  update(id: number, task: Task){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions});
    
    return this.http.put(Constants.server + ':' + Constants.port + this.url + id, JSON.stringify(task).toString(), requestOptions)
  }
}
