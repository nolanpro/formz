/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PeopleComponent } from './people.component';
import { AuthService } from '../auth.service';
import { AppModule } from '../app.module'
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { AuthProviders, FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import { DatastoreService } from '../datastore.service';
import { IPerson } from '../models/person.model'

import {
    RouterTestingModule
} from '@angular/router/testing';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let mockRouter;
  let mockFirebaseAuth;
  let mockDatastore;
  let authSubject;
  let people$;
  let person: IPerson = { firstname: 'foo', lastname: 'bar', createdAt: 123 };

  beforeEach(async(() => {
    authSubject = new Subject<FirebaseAuthState>();
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockFirebaseAuth = jasmine.createSpyObj('fbAuth', ['subscribe', 'logout']);
    mockFirebaseAuth.subscribe.and.callFake(callback => {
      return authSubject.subscribe(callback);
    });
    mockFirebaseAuth.logout.and.callFake(() => {
      authSubject.next(null);
    });

    mockDatastore = {};
    people$ = Observable.of([person]);
    mockDatastore.people$ = people$;

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: FirebaseAuth, useValue: mockFirebaseAuth },
        { provide: DatastoreService, useValue: mockDatastore },
      ],
      imports: [ AppModule, RouterTestingModule ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirects to the login page after signout', async(() => {
    let authData = { uid: '123' } as FirebaseAuthState;
    authSubject.next(authData);
    fixture.nativeElement.querySelectorAll('.signout-link')[0].click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  }));

  it('lists the people', async(() => {
    let authData = { uid: '123' } as FirebaseAuthState;
    authSubject.next(authData);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelectorAll('.people-list li')[0].innerHTML.trim()
    ).toEqual('Person: foo bar');
  }));
});
