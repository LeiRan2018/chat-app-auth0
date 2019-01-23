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


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    LoginComponent
  ],
  providers: [
    ChatService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
