import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DatastoreService } from '../datastore.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor(public auth: AuthService, public datastore: DatastoreService) { }

  ngOnInit() {
  }
}
