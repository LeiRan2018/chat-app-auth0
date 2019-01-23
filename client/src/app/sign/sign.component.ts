import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Sign } from '../models/sign.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  model: Sign;
  mess: string;
  returnUrl: string;
  constructor(
    private chat: ChatService,
    private router: Router,
  ) {
  }


  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
    this.model = new Sign('', '');
    this.returnUrl = '/login';
  }

  senduserid(meg: string) {
    this.chat.sendMsg(meg);
  }

  senduser() {
    this.chat.postuser(this.model)
      .subscribe(msg => { this.mess = msg });
    this.router.navigate([this.returnUrl]);
  }

}

