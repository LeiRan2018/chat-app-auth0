import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { Sign } from '../models/sign.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:3000';
  private socket;
  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  //login use with user name and get user info and chat history from broadcast room by default
  loginuser(username: any) {
    return this.http.post(`${this.url}/api/login`, { 'data': username }).pipe(
      map(res => {
        //save logged in user in localstorage
        localStorage.setItem('currentUser', JSON.stringify(res['data']));
        localStorage.setItem(res['data'].chatid, JSON.stringify(res['data']));
        return res['data']
      })
    );
  };

  //sign up user and send to backend
  signuser(user: Sign) {
    return this.http.post(`${this.url}/api/sign`, { 'data': user }).pipe(
      map(res => { return res['data'] })
    );
  };

  //logout user and clean localstorage 
  logout() {
    localStorage.removeItem('currentUser');
  }
}
