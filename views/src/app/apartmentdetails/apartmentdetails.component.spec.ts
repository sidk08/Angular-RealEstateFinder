import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentdetailsComponent } from './apartmentdetails.component';

describe('ApartmentdetailsComponent', () => {
  let component: ApartmentdetailsComponent;
  let fixture: ComponentFixture<ApartmentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
