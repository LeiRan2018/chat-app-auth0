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
  checkUB: boolean = false;
  id: string;
  contactid : string;
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
    let time = new Date().toLocaleString();
    if (this.checkUB){
      this.id = this.currentUser.userid + this.contactid;
      // console.log(combineid);
    }else {
      this.id = this.currentUser.userid;
    }
    this.chat.sendMsg({ meg: meg, username: this.currentUser.username, userid: this.id, time: time, status: this.checkUB });

  }
  getChat() {
    this.chat.messages.subscribe(msg => {
      console.log(msg);
      this.chats.push(msg);

    });
  }
  getinfo(id: string) {
    this.contactid = id;
    console.log(id);
    this.checkUB = true;
    console.log(this.checkUB);
    
  }
}
