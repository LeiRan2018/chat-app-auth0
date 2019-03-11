import { Component, OnInit } from '@angular/core';
import { Chats } from './models/chats.model';
import { AuthService } from './auth/auth.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    public auth: AuthService,
    public chat: ChatService
    ) {
    auth.handleAuthentication();
    auth.scheduleRenewal();
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.auth.renewTokens();
    }
  }
  clean() {
    localStorage.removeItem('currentUser');
  }

  getuser() {
    console.log(JSON.parse(localStorage.getItem('currentUser')))
  }
}
