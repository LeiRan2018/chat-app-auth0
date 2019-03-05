import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Sign } from './models/sign.model';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  // Our constructor calls our wsService connect method
  constructor(
    // private wsService: WebsocketService,
    private http: HttpClient
  ) {
    //connecting to server with socket.io
    this.socket = io(this.url);
  }

  //sign up user and send to backend
  signuser(user: Sign) {
    return this.http.post(`${this.url}/api/sign`, { 'data': user }).pipe(
      map(res => { return res['data'] })
    );
  }
  //send user message to backend and save to mysql
  postchat(msg: any) {
    return this.http.post(`${this.url}/api/chat/postchat`, { 'data': msg });
  }

  //login use with user name and get user info and chat history from broadcast room by default
  loginuser(username: any) {
    return this.http.post(`${this.url}/api/login`, { 'data': username }).pipe(
      map(res => {
        //save logged in user in localstorage
        localStorage.setItem('currentUser', JSON.stringify(res['data']));
        return res['data']
      })
    );
  }
  
  //switch to one-one chat mode with these two user name as parameter
  one(name: string) {
    return this.http.post(`${this.url}/api/one`, { data: name }).pipe(
      map(res => {
        localStorage.setItem(res['data'].roomID, JSON.stringify(res['data']));
        return res['data']
      })
    );
  }
  //logout user and clean localstorage 
  logout() {
    // console.log(JSON.parse(localStorage.getItem('currentUser')));
    return this.http.post(`${this.url}/api/login/out`, { 'data': JSON.parse(localStorage.getItem('currentUser')) }).pipe(
      map(res => {
        console.log('success');
        return res['data']
      })
    );
  }
  //send real message to backend with socket.io
  sendMessage(message) {

    this.socket.emit('add-message', message);
  }
  //join chat room with room id
  joinroom(room) {
    this.socket.emit('room', room);
  }
  //receive real-time message with socket.io
  getMessages() {
    let observable = new Observable(observer => {
      
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

}