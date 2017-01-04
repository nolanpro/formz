/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatastoreService } from './datastore.service';
import { AuthService } from './auth.service';

import { AppModule } from './app.module';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

describe('DatastoreService', () => {
  let mockAngularFire;
  let mockAuthService;
  let mockDatabase;

  beforeEach(() => {
    mockDatabase = jasmine.createSpyObj('database', ['list']);
    mockDatabase.list.and.callFake(() => {
      return [ { firstname: 'foo', lastname: 'bar', createdAt: '1' } ]
    });

    mockAngularFire = { database: mockDatabase };

    mockAuthService = { id: '123' };

    TestBed.configureTestingModule({
        imports: [ AppModule ],
        providers: [
          { provide: AuthService, useValue: mockAuthService },
          { provide: AngularFire, useValue: mockAngularFire },
        ]
      });
  });

  it('uses the correct path', inject([DatastoreService], (service: DatastoreService) => {
    expect(mockDatabase.list).toHaveBeenCalledWith('/formz/123');
  }));

  it('add a person', inject([DatastoreService], (service: DatastoreService) => {
    service.createPerson({ firstname: 'baz', lastname: 'bat'} )
    expect(service.people).toEqual([
      { firstname: 'foo', lastname: 'bar', createdAt: '1' },
      { firstname: 'baz', lastname: 'bat', createdAt: { '.sv': 'timestamp' } },
    ]);
  }));
});
