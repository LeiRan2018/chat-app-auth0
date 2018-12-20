import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

import { Chats } from './models/chats.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  message: string;
  chats: Array<Chats>;
  userid: string;

  constructor() {
    this.chats = new Array<Chats>();

  }

  ngOnInit() {


  }



}
