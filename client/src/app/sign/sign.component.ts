import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Location } from '@angular/common';
import { Sign } from '../models/sign.model';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  userid: string;
  model: Sign;
  mess: string;
  constructor(
    private chat: ChatService,
    private location: Location) {
  }


  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
    this.model = new Sign('', '');
    // this.senduserid('');
    // this.getuserid();
  }

  senduserid(meg: string) {
    this.chat.sendMsg(meg);
  }

  senduser() {

    this.chat.postuser(this.model)
      .subscribe(msg => { this.mess = msg });

    // this.location.back();
  }

  // getuserid() {
  //   this.chat.messages.subscribe(msg => {
  //     console.log('userid');
  //     this.userid = msg['userid'];
  //     this.model = new Sign(this.userid, '', '');
  //   })
  // }

}

