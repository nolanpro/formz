/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PeopleComponent } from './people.component';
import { AuthService } from '../auth.service';
import { AppModule } from '../app.module'
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
    RouterTestingModule
} from '@angular/router/testing';


describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let mockRouter;
  let mockAuthService;
  let mockFirebaseAuth;
  let mockSubscription;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockFirebaseAuth = jasmine.createSpyObj('FirebaseAuth', ['subscribe']);
    mockSubscription = jasmine.createSpyObj('subscription', ['unsubscribe']);
    mockFirebaseAuth.subscribe.and.returnValue(mockSubscription);

    mockAuthService =
      jasmine.createSpyObj('AuthService', ['isLoggedIn', 'signOut', 'auth$']);
    mockAuthService.isLoggedIn.and.returnValue(true);
    mockAuthService.auth$.and.returnValue(mockFirebaseAuth)
    mockFirebaseAuth.subscribe.and.returnValue(mockSubscription)

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
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

  it('redirects to the login page after signout', () => {
    fixture.nativeElement.querySelectorAll('.signout-link')[0].click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });
});
