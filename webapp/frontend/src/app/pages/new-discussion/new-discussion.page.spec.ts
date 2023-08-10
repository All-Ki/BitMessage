import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewDiscussionPage } from './new-discussion.page';

describe('NewDiscussionPage', () => {
  let component: NewDiscussionPage;
  let fixture: ComponentFixture<NewDiscussionPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(NewDiscussionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
