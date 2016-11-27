import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { DatastoreService } from '../datastore.service';
import { FirebaseListObservable } from 'angularfire2';
import { IPerson } from '../models/person.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  // [tasks]="taskService.visibleTasks$"
  // @Input() people$: FirebaseListObservable<IPerson[]>;

  constructor(
    public auth: AuthService,
    public datastore: DatastoreService,
    private router: Router) { }

  ngOnInit() {
  }
}
