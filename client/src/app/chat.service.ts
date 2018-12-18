import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Chat } from './models/chat.model';
import { Login } from './models/login.model';
import { Sign } from './models/sign.model';

@Injectable()
export class ChatService {
  api = `http://localhost:3000/api/chat`;
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
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  };

  getChat(id: string): Observable<Chat> {
    return this.http.get(`${this.api}/${id}`).pipe(
      map(res => { return res['data'] as Chat })
    );
  }

  postuser(user: any) {
    return this.http.post(`${this.api}/post`, { 'data': user }).pipe(
      map(res => { return res['data'] })
    );
  }
  postchat(msg: any) {
    return this.http.post(`${this.api}/postchat`, { 'data': msg });
  }
  postusername(username: any) {
    return this.http.post(`${this.api}/login`, { 'data': username }).pipe(
      map(res => {
        localStorage.setItem('currentUser', JSON.stringify(res['data']));
        return res['data']
      })
    );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}