import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from './models/chat.model';
import { Chats } from './models/chats.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  message: string;
  chat_message: Chat;
  chats: Array<Chats>;
  userid: string;
  

  constructor(private chat: ChatService) {
    this.chats = new Array<Chats>();
  }

  ngOnInit() {
    this.getChat();
    // this.getuserid();
    // this.senduserid('');
  }

  sendMessage(meg: string) {
    this.chat.sendMsg(meg);
  }
  
  senduserid(meg: string) {
    this.chat.sendMsg(meg);
  }

  getChat() {
    this.chat.messages.subscribe(msg => {

      console.log(msg);
      this.chats.push(msg);
    });
  }
  getuserid() {
    this.chat.messages.subscribe(msg => {
      console.log('userid');
      this.userid = msg['userid'];
    })
  }

}
