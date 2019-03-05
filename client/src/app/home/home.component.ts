import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chats } from '../models/chats.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  one: Object;
  chats: Array<Chats>;
  chatForm = new FormGroup({
    chat: new FormControl('', Validators.required),
  });
  roomID: string;
  broadcast: boolean = false;
  login: boolean = true;
  broadcastbutton: boolean = true;
  contact: Object;
  oneonetag: string;
  selectinfo: Object;
  messages: Array<any>;
  message: Array<any>;
  data_li: Object;
  profile: any;
  constructor(

    private chat: ChatService,
    public auth: AuthService
  ) {
    this.messages = new Array<any>();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.contact = this.currentUser.contacts.find(el => el.userName === this.currentUser.username);
    this.currentUser.contacts.splice(this.currentUser.contacts.indexOf(this.contact), 1);
    this.roomID = JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')).chatid : '';

  }
  ngOnInit() {
    this.receive();
    this.getprofile();
  }

  oneone(user: Object) {
    this.selectinfo = user;
    this.broadcastupdate();
    this.chat.one(user['userName'] + ',' + this.currentUser.username).subscribe(value => {
      this.one = JSON.parse(localStorage.getItem(value.roomID));
      this.roomID = value.roomID;
      console.log(this.roomID);
      this.chat.joinroom(this.roomID);
    });
    this.broadcast = false;
    this.oneonetag = user['userName'] + ',' + this.currentUser.username;
    this.messages = new Array<any>();
    this.login = false;
    this.broadcastbutton = false;


  }
  broadcasted() {
    this.selectinfo = null;
    this.broadcast = true;
    this.login = false;
    this.broadcastbutton = true;
    this.one = null;
    this.roomID = JSON.parse(localStorage.getItem('currentUser')).chatid;
    this.chat.joinroom(this.roomID);
    this.oneonetag = '';
    this.messages = new Array<any>();
  }
  broadcastupdate() {
    let historymess = [];
    this.currentUser.message.forEach(el => {
      historymess.push({ message: el.message, username: el.username });
    });
    this.message = historymess.concat(this.messages);

  }

  send(mess: string) {
    this.chat.sendMessage({ room: this.roomID, mess: mess, user: this.currentUser.username });
    this.chat.postchat({ msg: mess, username: this.currentUser.username, chatid: this.roomID }).subscribe();
    if (this.chatForm.valid) {
      this.chatForm.reset();
    }
  }

  receive() {
    this.chat.getMessages().subscribe(msg => {
      console.log(msg)
      this.messages.push(msg);
      console.log(this.messages);
    })
  }

  // li() {
  //   this.chat.postusername(this.profile.nickname).subscribe(el => {
  //     this.data_li = el;
  //   })
  // }

  getprofile() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

}
