import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  mess: string;
  returnUrl: string;
  logged: boolean = false;
  test = 'hello';
  constructor(
    private chat: ChatService,
    private router: Router,

  ) {

  }

  ngOnInit() {
    this.returnUrl = '/';
    this.chat.logout();

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
