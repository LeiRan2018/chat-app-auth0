import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chats } from '../models/chats.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  chats: Array<Chats>;
  data: any;
  hindex: boolean;
  constructor(
    private chat: ChatService,
  ) {
    this.chats = new Array<Chats>();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.hindex = (this.currentUser.content.length - 1 ) % 2 == 0 ? true : false;
  }
  ngOnInit() {
    this.getChat();
  }

  sendMessage(meg: string) {
    let time = new Date().toLocaleString();

    this.chat.sendMsg({ meg: meg, username: this.currentUser.username, userid: this.currentUser.userid, time: time });

  }
  getChat() {
    this.chat.messages.subscribe(msg => {
      this.chats.push(msg);
      console.log(msg);
      this.chat.postchat({ msg: msg, userid: this.currentUser.userid }).subscribe();
    });
    
  }
  

}
