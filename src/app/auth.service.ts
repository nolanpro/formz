import { Injectable, OnInit, Inject } from '@angular/core';
import { AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState = null;
  public isLoggedIn: Boolean = false;

  constructor(public auth$: FirebaseAuth) {
    this.onInit();
  }

  onInit() {
    this.auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.isLoggedIn = !!state;
    });
  }

  signOut(): void {
    this.auth$.logout();
  }

  get id(): string {
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
