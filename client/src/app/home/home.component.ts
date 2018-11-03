import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { stringify } from '@angular/compiler/src/util';
import { Chats } from '../models/chats.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  chats: Array<Chats>;
  constructor(
    private chat: ChatService,
  ) {
    this.chats = new Array<Chats>();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  // get diagnostic() { return JSON.stringify(this.currentUser); }
  ngOnInit() {
    this.getChat();
    // this.getuserid();
    // this.senduserid('');
  }
  senduserid(meg: string) {
    this.chat.sendMsg(meg);
  }
  sendMessage(meg: string) {
    this.chat.sendMsg({ meg: meg, userid: this.currentUser.userid });
  }
  getChat() {
    this.chat.messages.subscribe(msg => {
      console.log(msg);
      this.chats.push(msg);
    });
  }
}
