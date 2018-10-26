import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Login } from '../models/login.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userid: string;
  model = {
    username: ''
  }
  mess: any;
  logged: boolean = true;
  test = 'hello';
  constructor(
    private chat: ChatService,
    private location: Location) {
      this.logged = true;
  }


  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
    // this.senduserid('');
    // this.getuserid();
  }

  senduserid(meg: string) {
    this.chat.sendMsg(meg);
  }

  sendusername() {
    this.chat.postusername(this.model)
      .subscribe(msg => { this.mess = msg });
    this.logged = false;
    // this.location.back();
  }

}
