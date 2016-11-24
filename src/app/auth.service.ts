import { Injectable, OnInit } from '@angular/core';
import { AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService implements OnInit {
  private authState: FirebaseAuthState = null;

  constructor(public auth$: FirebaseAuth) { }

  ngOnInit() {
    this.auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      console.log('Subscription Auth State:', this.authState);
    });
  }

  signOut(): void {
    console.log("SIGNING OUT!!");
    this.auth$.logout();
  }

  id(): string {
    return this.authState ? this.authState.uid : '';
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Google);
  }

  signIn(provider: number): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({provider})
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

}
