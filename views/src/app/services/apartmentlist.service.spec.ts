import { TestBed, inject } from '@angular/core/testing';

import { ApartmentlistService } from './apartmentlist.service';

describe('ApartmentlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApartmentlistService]
    });
  });

  it('should be created', inject([ApartmentlistService], (service: ApartmentlistService) => {
    expect(service).toBeTruthy();
  }));
});
