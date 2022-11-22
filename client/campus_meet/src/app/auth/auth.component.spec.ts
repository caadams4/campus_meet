
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import {Observable} from 'rxjs';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let socialAuthServiceMock: SpyObj<SocialAuthService>;

  socialAuthServiceMock = createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      providers: [{ provide: SocialAuthService, useValue: {...socialAuthServiceMock, authState: new Observable()} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
