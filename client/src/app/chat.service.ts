import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {
  api = `http://localhost:3000/api`;
  messages: Subject<any>;
  // Our constructor calls our wsService connect method
  constructor(
    private wsService: WebsocketService,
    private http: HttpClient
  ) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
    // this.items = new Array<Object>();
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  };

  postuser(user: any) {
    return this.http.post(`${this.api}/sign`, { 'data': user }).pipe(
      map(res => { return res['data'] })
    );
  }
  postchat(msg: any) {
    return this.http.post(`${this.api}/chat/postchat`, { 'data': msg });
  }
  postusername(username: any) {
    return this.http.post(`${this.api}/login`, { 'data': username }).pipe(
      map(res => {
        localStorage.setItem('currentUser', JSON.stringify(res['data']));
        return res['data']
      })
    );
  }

  one(name: string) {
    return this.http.post(`${this.api}/one`, {data: name}).pipe(
      map(res => {
        localStorage.setItem(res['data'].roomID, JSON.stringify(res['data']));
        return res['data']
      })
    );
  }
  logout() {
    // console.log(JSON.parse(localStorage.getItem('currentUser')));
    return this.http.post(`${this.api}/login/out`, { 'data': JSON.parse(localStorage.getItem('currentUser')) }).pipe(
      map(res => {
        console.log('success');
        return res['data']
      })
    );
  }

}