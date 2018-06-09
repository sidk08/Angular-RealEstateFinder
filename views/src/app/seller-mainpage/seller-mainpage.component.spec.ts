import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerMainpageComponent } from './seller-mainpage.component';

describe('SellerMainpageComponent', () => {
  let component: SellerMainpageComponent;
  let fixture: ComponentFixture<SellerMainpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerMainpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
