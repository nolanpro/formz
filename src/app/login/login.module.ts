import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';

////////////////////////////////////////////////////////////
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Observable } from 'rxjs/Observable';
@Injectable()
class UnauthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.auth.auth$.map(authState => !authState).do(notLoggedIn => {
      if (!notLoggedIn) {
        console.log("ALREADY LOGGED IN, REDIRECTING TO ROOT")
        this.router.navigate(['/']);
      }
    });
  }
}
////////////////////////////////////////////////////////////

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [UnauthGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [ UnauthGuard ],
  declarations: [ LoginComponent ]
})
export class LoginModule { }
