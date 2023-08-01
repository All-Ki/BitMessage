import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactDetailsPage } from './contact-details.page';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('ContactDetailsPage', () => {
  let component: ContactDetailsPage;
  let fixture: ComponentFixture<ContactDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ContactDetailsPage],
      providers: [
        { provide: ContactService, useValue: jasmine.createSpyObj('ContactService', ['getContact', 'updateContact']) },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '1' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display contact details', () => {
    const contactService = TestBed.inject(ContactService);
    contactService.getContact.and.returnValue(of({ id: '1', name: 'Test', email: 'test@test.com' }));
    component.ngOnInit();
    expect(component.contactForm.value).toEqual({ id: '1', name: 'Test', email: 'test@test.com' });
  });

  it('should edit contact details', () => {
    const contactService = TestBed.inject(ContactService);
    component.contactForm.setValue({ id: '1', name: 'Test', email: 'test@test.com' });
    component.save();
    expect(contactService.updateContact).toHaveBeenCalledWith({ id: '1', name: 'Test', email: 'test@test.com' });
  });

  it('should validate contact form', () => {
    component.contactForm.setValue({ id: '1', name: '', email: '' });
    expect(component.contactForm.valid).toBeFalsy();
  });
});
