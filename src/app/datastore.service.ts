import { Injectable, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from './auth.service';
import { IPerson } from './models/person.model'

@Injectable()
export class DatastoreService implements OnInit {

  constructor(private af: AngularFire, private auth: AuthService) { }

  private tasks$: FirebaseListObservable<IPerson[]>;

  ngOnInit() {
    const path = `/tasks/${this.auth.id}`;
    this.tasks$ = this.af.database.list(path);
  }

  public createPerson($event) {
    console.log("GOT EVENT", $event)
  }
}
