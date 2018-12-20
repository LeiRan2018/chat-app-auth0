import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
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
  ) {
  }


  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
    this.model = new Sign('', '');
  }

  senduserid(meg: string) {
    this.chat.sendMsg(meg);
  }

  senduser() {

    this.chat.postuser(this.model)
      .subscribe(msg => { this.mess = msg });
  }

}

