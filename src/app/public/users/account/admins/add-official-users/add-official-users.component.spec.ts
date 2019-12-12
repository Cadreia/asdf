import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficialUsersComponent } from './add-official-users.component';

describe('AddOfficialUsersComponent', () => {
  let component: AddOfficialUsersComponent;
  let fixture: ComponentFixture<AddOfficialUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfficialUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfficialUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
