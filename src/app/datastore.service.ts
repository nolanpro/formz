import { Injectable, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from './auth.service';
import { IPerson } from './models/person.model'

@Injectable()
export class DatastoreService {

  constructor(private af: AngularFire, private auth: AuthService) {
    // NOTE: Service classes DO NOT call ngOnInit
    // http://stackoverflow.com/questions/35110690/ngoninit-not-being-called-when-injectable-class-is-instantiated
    this.onInit();
  }

  public people$: FirebaseListObservable<IPerson[]>;

  onInit() {
    var path = `/formz/${this.auth.id}`;
    this.people$ = this.af.database.list(path);
  }

  createPerson(form): firebase.Promise<any> {
    var person: IPerson = {
      firstname: form.firstname,
      lastname: form.lastname,
      createdAt: firebase.database['ServerValue']['TIMESTAMP']
    }
    return this.people$.push(person);
  }

  get people() {
    return this.people$;
  }
}
