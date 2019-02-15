import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { AuthService } from '../auth/auth.service';
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
  error: Object;
  constructor(
    private chat: ChatService,
    private router: Router,
    public auth: AuthService

  ) {}

  ngOnInit() {
  }
}
