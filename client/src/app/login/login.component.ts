import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userid: string;
  model: Login;
  mess: string;
  constructor(private chat: ChatService) {
  }

  
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
    this.senduserid('');
    this.getuserid();
  }

  senduserid(meg: string) {
    this.chat.sendMsg(meg);
  }

  senduser(){
    this.chat.postuser(this.model)
    .subscribe(msg => {this.mess = msg} );
  }

  getuserid() {
    this.chat.messages.subscribe(msg => {
      console.log('userid');
      this.userid = msg['userid'];
      this.model = new Login(this.userid,'','');
    })
  }

}
