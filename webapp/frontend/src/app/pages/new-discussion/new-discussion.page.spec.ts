import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewDiscussionPage } from './new-discussion.page';
import { DiscussionService } from '../../services/discussion.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('NewDiscussionPage', () => {
  let component: NewDiscussionPage;
  let fixture: ComponentFixture<NewDiscussionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NewDiscussionPage],
      providers: [
        { provide: DiscussionService, useValue: jasmine.createSpyObj('DiscussionService', ['createDiscussion']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDiscussionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new discussion', () => {
    const discussionService = TestBed.inject(DiscussionService);
    component.discussionForm.setValue({ title: 'Test', content: 'Test content' });
    component.save();
    expect(discussionService.createDiscussion).toHaveBeenCalledWith({ title: 'Test', content: 'Test content' });
  });

  it('should validate discussion form', () => {
    component.discussionForm.setValue({ title: '', content: '' });
    expect(component.discussionForm.valid).toBeFalsy();
  });

  it('should display error message', () => {
    const discussionService = TestBed.inject(DiscussionService);
    discussionService.createDiscussion.and.returnValue(throwError('Error'));
    component.discussionForm.setValue({ title: 'Test', content: 'Test content' });
    component.save();
    expect(component.errorMessage).toBe('Error');
  });
});
