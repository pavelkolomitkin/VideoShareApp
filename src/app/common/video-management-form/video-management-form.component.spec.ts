import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoManagementFormComponent } from './video-management-form.component';

describe('VideoManagementFormComponent', () => {
  let component: VideoManagementFormComponent;
  let fixture: ComponentFixture<VideoManagementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoManagementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
