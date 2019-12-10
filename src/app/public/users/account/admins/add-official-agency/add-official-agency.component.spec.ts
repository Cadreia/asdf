import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficialAgencyComponent } from './add-official-agency.component';

describe('AddOfficialAgencyComponent', () => {
  let component: AddOfficialAgencyComponent;
  let fixture: ComponentFixture<AddOfficialAgencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfficialAgencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfficialAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
