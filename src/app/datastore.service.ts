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
    console.log("PATH:", path)
    this.people$ = this.af.database.list(path);
  }

  createPerson(form): firebase.Promise<any> {
    console.log("GOT EVENT", form)
    var person: IPerson = {
      firstname: form.firstname,
      lastname: form.lastname,
      createdAt: firebase.database['ServerValue']['TIMESTAMP']
    }
    console.log("PUSHING PERSON TO FB", person)
    return this.people$.push(person);
  }

  get people() {
    return this.people$;
  }
}
