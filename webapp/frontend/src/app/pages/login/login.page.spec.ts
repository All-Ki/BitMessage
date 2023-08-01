import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginPage],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['login']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);
    authService.login.and.returnValue(of({}));
    component.loginForm.setValue({ username: 'test', password: 'test' });
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not login with incorrect credentials', () => {
    const authService = TestBed.inject(AuthService);
    authService.login.and.returnValue(throwError('Error'));
    component.loginForm.setValue({ username: 'test', password: 'wrong' });
    component.login();
    expect(component.errorMessage).toBe('Error');
  });

  it('should validate login form', () => {
    component.loginForm.setValue({ username: '', password: '' });
    expect(component.loginForm.valid).toBeFalsy();
  });
});
