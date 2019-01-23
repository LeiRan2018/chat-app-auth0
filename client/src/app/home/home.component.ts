import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chats } from '../models/chats.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  chats: Array<Chats>;
  hindex: boolean;
  chatForm = new FormGroup({
    chat: new FormControl('', Validators.required),
  });

  constructor(

    private chat: ChatService,
  ) {
    this.chats = new Array<Chats>();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.hindex = (this.currentUser.content.length + 1) % 2 == 0 ? true : false;

  }
  ngOnInit() {
    this.getChat();
  }

  sendMessage(meg: string) {
    let time = new Date().toLocaleString();
    this.chat.sendMsg({ meg: meg, username: this.currentUser.username, userid: this.currentUser.userid, time: time });
    if (this.chatForm.valid) {
      this.chatForm.reset();
    }
  }
  getChat() {
    this.chat.messages.subscribe(msg => {
      this.chats.push(msg);
      console.log(msg);
      this.chat.postchat({ msg: msg, userid: this.currentUser.userid }).subscribe();
    });

  }


}
