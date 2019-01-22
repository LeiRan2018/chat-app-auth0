import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
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
  returnUrl: string;
  logged: boolean = false;
  constructor(
    private chat: ChatService,
    private router: Router,

  ) {

  }

  ngOnInit() {
    this.returnUrl = '/';
    this.chat.logout();
    this.model = new Login('');
  }

  senduser() {
    this.chat.postusername(this.model)
      .subscribe(msg => {
        if (typeof (msg) == 'string') {
          this.mess = msg;
          this.logged = true;
        } else {
          this.router.navigate([this.returnUrl]);
        }

      });
  }

}
