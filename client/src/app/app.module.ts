import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChatService } from './chat.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule }   from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SignComponent } from './sign/sign.component';
import { NgbdModalContent } from './header/header.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignComponent,
    NgbdModalContent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  entryComponents:[
    NgbdModalContent,
  ],
  providers: [
    ChatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
