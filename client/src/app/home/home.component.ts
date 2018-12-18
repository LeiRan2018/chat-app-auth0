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
  ngOnInit() {
    this.getChat();
  }
  senduserid(meg: string) {
    this.chat.sendMsg(meg);
  }
  sendMessage(meg: string) {
    let time = new Date().toLocaleString();

    this.chat.sendMsg({ meg: meg, username: this.currentUser.username, userid: this.currentUser.userid, time: time });

  }
  getChat() {
    this.chat.messages.subscribe(msg => {

      this.chats.push(msg);

    });
  }
  savedata() {
    this.chat.messages.subscribe(msg => {
      this.chat.postchat({ msg: msg, userid: this.currentUser.userid }).subscribe();
      console.log(msg);
    })
  }

}
