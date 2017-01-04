import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FirebaseModule } from './firebase/firebase.module'
import { LoginModule } from './login/login.module'
import { Routes, Router, RouterModule, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { PeopleComponent } from './people/people.component';

import { DatastoreService } from './datastore.service';
import { AuthService } from './auth.service';


/////////////////////////////////////////////////////////////////////
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    // map: converts Observable<FirebaseAuthState> to Observable<bool> for return val
    // on: tag on some work when observable resolves (in this case, redirect to login page)
    return this.auth.auth$.map(authState => !!authState).do(authState => {
      if (!authState) {
        this.router.navigate(['/login']);
      }
    });
  }
}
/////////////////////////////////////////////////////////////////////

const routes: Routes = [
  {path: '', component: PeopleComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PeopleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FirebaseModule,
    LoginModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    DatastoreService,
    AuthGuard,
    AuthService,
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
