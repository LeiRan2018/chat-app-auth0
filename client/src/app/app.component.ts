import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from './models/chat.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  
  message: string;
  chat_message: Chat;
  chats: Array<string>;

  
  constructor(private chat: ChatService){
    this.chats = new Array<string>();
   }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      console.log(msg);
      this.chats.push(msg);
    })
  }

  sendMessage(meg: string) {
    this.chat.sendMsg(meg);
  }

  getChat(id: string) {
    this.chat.getChat(id)
      .subscribe(data => this.chat_message = data);
  }
}
