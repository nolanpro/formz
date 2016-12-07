/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatastoreService } from './datastore.service';

import { AppModule } from './app.module';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

describe('DatastoreService', () => {
  let MockAngularFire;
  let MockAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ AppModule ],
      });
  });

  it('should ...', inject([DatastoreService], (service: DatastoreService) => {
    expect(service).toBeTruthy();
  }));
});
