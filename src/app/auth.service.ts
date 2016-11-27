import { Injectable, OnInit } from '@angular/core';
import { AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState = null;

  constructor(public auth$: FirebaseAuth) {
    this.onInit();
  }

  onInit() {
    this.auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  signOut(): void {
    this.auth$.logout();
  }

  get isLoggedIn(): boolean {
    return !!this.authState;
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
