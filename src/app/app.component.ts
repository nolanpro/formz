import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatastoreService } from './datastore.service'
import { AuthService } from './auth.service'

import { FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'form test';

  constructor() { }
  ngOnInit() { }
}
