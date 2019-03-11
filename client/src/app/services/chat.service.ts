import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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


  //send user message to backend and save to mysql
  postchat(msg: any) {
    return this.http.post(`${this.url}/api/chat/postchat`, { 'data': msg });
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

  //send real message to backend with socket.io
  sendMessage(message) {

    this.socket.emit('add-message', message);
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