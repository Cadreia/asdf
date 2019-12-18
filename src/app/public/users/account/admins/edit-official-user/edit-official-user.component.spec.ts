import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfficialUserComponent } from './edit-official-user.component';

describe('EditOfficialUserComponent', () => {
  let component: EditOfficialUserComponent;
  let fixture: ComponentFixture<EditOfficialUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOfficialUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOfficialUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
