/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatastoreService } from './datastore.service';

import { AuthService } from './auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

describe('DatastoreService', () => {
  let MockAngularFire;
  let MockAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          {provide: AngularFire, useValue: MockAngularFire },
          {provide: AuthService, useValue: MockAuthService },
        ]
      });
  });

  it('should ...', inject([DatastoreService], (service: DatastoreService) => {
    expect(service).toBeTruthy();
  }));
});
