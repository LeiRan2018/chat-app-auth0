import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { Login } from '../models/login.model';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private location: Location,
    // public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private router: Router,
    // private modalService: NgbModal
  ) {

  }


  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
    // this.senduserid('');
    // this.getuserid();
    this.returnUrl = '/';
    this.chat.logout();

  }


  senduserid(meg: string) {
    this.chat.sendMsg(meg);
  }

  sendusername() {
    this.chat.postusername(this.model)
      .subscribe(msg => { this.mess = msg });
    this.logged = false;
    // this.location.back();
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
