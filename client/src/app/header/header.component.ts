import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  constructor(
    private chat: ChatService,
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.chat.logout().subscribe(() => {
      localStorage.removeItem('currentUser');
      location.reload();
    });
  }

}
