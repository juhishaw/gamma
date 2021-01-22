import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobHistoryComponent } from './add-edit-job-history.component';

describe('AddEditJobHistoryComponent', () => {
  let component: AddEditJobHistoryComponent;
  let fixture: ComponentFixture<AddEditJobHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditJobHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditJobHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
