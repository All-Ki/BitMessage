import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsPage } from './settings.page';
import { SettingsService } from '../../services/settings.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SettingsPage],
      providers: [
        { provide: SettingsService, useValue: jasmine.createSpyObj('SettingsService', ['getSettings', 'updateSettings']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change settings', () => {
    const settingsService = TestBed.inject(SettingsService);
    component.settingsForm.setValue({ theme: 'dark', notifications: true });
    component.save();
    expect(settingsService.updateSettings).toHaveBeenCalledWith({ theme: 'dark', notifications: true });
  });

  it('should validate settings form', () => {
    component.settingsForm.setValue({ theme: '', notifications: '' });
    expect(component.settingsForm.valid).toBeFalsy();
  });
});
