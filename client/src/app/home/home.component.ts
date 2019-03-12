import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Chats } from '../models/chats.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { LoginService } from '../services/login.service';
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
  broadcast: boolean = false;
  login: boolean = true;
  broadcastbutton: boolean = true;
  contact: Object;
  roomTag: string;
  selectinfo: Object;
  messages: Array<any>;
  message: Array<any>;
  data_li: Object;
  profile: any;
  roomId: string;
  constructor(

    private _chat: ChatService,
    public auth: AuthService,
    private _login: LoginService
  ) {
    this.messages = new Array<any>();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.contact = this.currentUser.contacts.find(el => el.userName === this.currentUser.username);
    this.currentUser.contacts.splice(this.currentUser.contacts.indexOf(this.contact), 1);
    this.roomId = JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')).chatid : '';

  }
  ngOnInit() {
    this.receive();
    this.getprofile();
  }

  send(mess: string) {
    // console.log({ room: this.roomID, mess: mess, user: this.currentUser.username })
    this._chat.sendMessage({ room: this.roomId, mess: mess, user: this.currentUser.username });
    // this.chat.postchat({ msg: mess, username: this.currentUser.username, chatid: this.roomID }).subscribe();
    if (this.chatForm.valid) {
      this.chatForm.reset();
    }
  }

  receive() {
    this._chat.getMessages().subscribe(msg => {
      console.log(msg)
      this.messages.push(msg);
      console.log(this.messages);
    })
  }

  getprofile() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

  // switch room bettwen one-one room or broadcast room
  changeRoom(user: any) {
    if (user['userName']) {
      this.roomId = user['userName'] + ',' + this.currentUser.username;
      this.roomTag = this.roomId;
    } else {
      this.roomId = this.currentUser.chatid;
      this.roomTag = 'Broadcast Room '
    }
    console.log(this.roomId);
    this.selectinfo = user;
    this._chat.changeRoom(this.roomId).subscribe(value => {
      this.one = JSON.parse(localStorage.getItem(value.roomID));
      this.roomId = value.roomID;
      console.log(this.roomId);
      this._chat.joinroom(this.roomId);
    });
    this.messages = new Array<any>();
    this.login = false;
    this.broadcastbutton = false;


  }

}
