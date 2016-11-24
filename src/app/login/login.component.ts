import { Component } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  template: `<button (click)="signInWithGoogle()" type="button">Sign In With Google</button>`,
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) { }

  signInWithGoogle(): void {
    this.auth.signInWithGoogle()
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
