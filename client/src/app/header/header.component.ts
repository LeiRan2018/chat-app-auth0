import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chats } from '../models/chats.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  currentUser: any;
  chats: Array<Chats>;
  constructor(
    private chat: ChatService,
    private router: Router,
  ) {
    this.chats = new Array<Chats>();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getChat();
  }

  getChat() {
    this.chat.messages.subscribe(msg => {

      this.chats.push(msg);
    });
  }
  logout_save() {
    this.router.navigate(['/login']);
    this.chat.postchat({ msg: this.chats, userid: this.currentUser.userid }).subscribe();
    console.log({ msg: this.chats, userid: this.currentUser.userid });
  }

}
