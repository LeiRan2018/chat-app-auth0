import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Chat } from './models/chat.model';

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
      map(res => {return res['data'] as Chat})
    )
  }

}