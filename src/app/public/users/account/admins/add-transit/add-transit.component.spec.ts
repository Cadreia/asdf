import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransitComponent } from './add-transit.component';

describe('AddTransitComponent', () => {
  let component: AddTransitComponent;
  let fixture: ComponentFixture<AddTransitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
