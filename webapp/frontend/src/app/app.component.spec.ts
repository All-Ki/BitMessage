import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: ActivatedRoute, useValue: { url: of('') } }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate', () => {
    const router = TestBed.inject(Router);
    app.navigate('home');
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should display component based on route', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.url = of('home');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-home')).toBeTruthy();
  });

  it('should handle error', () => {
    app.handleError(new Error('Error'));
    expect(app.errorMessage).toBe('Error');
  });

});
