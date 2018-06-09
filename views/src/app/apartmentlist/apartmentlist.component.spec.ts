import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentlistComponent } from './apartmentlist.component';

describe('ApartmentlistComponent', () => {
  let component: ApartmentlistComponent;
  let fixture: ComponentFixture<ApartmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
