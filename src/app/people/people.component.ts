import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { DatastoreService } from '../datastore.service';
import { FirebaseListObservable } from 'angularfire2';
import { IPerson } from '../models/person.model'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  subscription: Subscription;

  constructor(
    public auth: AuthService,
    public datastore: DatastoreService,
    public router: Router) { }

  ngOnInit() {
    if (this.auth.auth$) {
      this.subscription = this.auth.auth$.subscribe(authState => {
        if (!authState) {
          this.router.navigate(['login']);
        }
      });
    }
  }

  get testfunc() {
    return this.auth.auth$;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  doSignOut($event): void {
    $event.preventDefault();
    this.auth.signOut();
  }
}
