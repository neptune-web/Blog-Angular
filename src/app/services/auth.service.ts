import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public notifyLogin$ = new Subject();
  isLoggedIn = localStorage.getItem("token") ? true : false;


  
  constructor(private httpClient: HttpClient) { }

  login(data: any){
    return this.httpClient.post('http://localhost:3000/user/login', data);
  }

  register(data: any){
    return this.httpClient.post('http://localhost:3000/user/register', data);
  }

  getToken(){
    this.notifyLogin$.next(true);
    return localStorage.getItem('token');
  }
}
