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
  two: string;
  chats: Array<Chats>;
  hindex: boolean;
  chatForm = new FormGroup({
    chat: new FormControl('', Validators.required),
  });
  roomID: string;
  broadcast: boolean = true;
  contact: Object;
  oneonetag: string;
  data_li: Object;
  profile: any;
  constructor(

    private chat: ChatService,
    public auth: AuthService
  ) {
    this.chats = new Array<Chats>();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.contact =  this.currentUser.contacts.find(el => el.userName === this.currentUser.username);
    this.currentUser.contacts.splice(this.currentUser.contacts.indexOf(this.contact),1);
    this.roomID = JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')).chatid : '';  
    // this.hindex = (this.currentUser.message.length + 1) % 2 == 0 ? true : false;
    // this.hindex = true;

  }
    ngOnInit() {
    this.getChat();
    this.getprofile();
  }

  sendMessage(meg: string) {
    this.chat.sendMsg({ meg: meg, userid: this.currentUser.userid });
    this.chat.postchat({ msg: meg + ' from ' + this.currentUser.username, chatid: this.roomID }).subscribe();
    if (this.chatForm.valid) {
      this.chatForm.reset();
    }
  }
  getChat() {
    this.chat.messages.subscribe(msg => {
      this.chats.push(msg);
      console.log(msg.meg);
      // this.chat.postchat({ msg: msg.meg, userid: this.currentUser.userid, chatid: this.currentUser.chatid }).subscribe();
    });

  }
  oneone(user: Object){
    this.chat.one(user['userName'] + ',' + this.currentUser.username).subscribe(value =>{
      this.one = JSON.parse(localStorage.getItem(value.roomID));
      this.roomID = value.roomID;
    });
    this.broadcast = false;
    this.oneonetag = user['userName'] + ',' + this.currentUser.username;
  }
  broadcasted(){
    this.broadcast = true;
    this.one = null;
    this.roomID = JSON.parse(localStorage.getItem('currentUser')).chatid;
    this.oneonetag = '';
  }
  
  li() {
    this.chat.postusername(this.profile.nickname).subscribe(el =>{
      this.data_li = el;
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

}
