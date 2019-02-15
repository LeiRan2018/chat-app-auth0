import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign', component: SignComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: CallbackComponent},
  { path: 'profile', component: ProfileComponent},
  
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})
export class AppRoutingModule { }
// export const routing = RouterModule.forRoot(routes);